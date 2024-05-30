"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
dotenv_1.default.config();
const pepper = process.env.BCRYPT_PASSWORD;
const salt = process.env.SALT_ROUNDS || "";
class UserStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM users";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }
    async create(u) {
        try {
            const sql = 'INSERT INTO users (firstname, lastname, password_digest) VALUES($1, $2, $3) RETURNING *';
            const conn = await database_1.default.connect();
            const hash = bcrypt_1.default.hashSync(u.password + pepper, parseInt(salt));
            console.log(hash, u.firstname, u.lastname);
            const result = await conn.query(sql, [u.firstname, u.lastname, hash]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not add new user. Error: ${err}`);
        }
    }
    async authenticate(user) {
        const conn = await database_1.default.connect();
        const sql = 'SELECT * FROM users WHERE firstname=($1) AND lastname=($2)';
        const result = await conn.query(sql, [user.firstname, user.lastname]);
        if (result.rows.length) {
            const u = result.rows[0];
            if (bcrypt_1.default.compareSync(user.password + pepper, u.password_digest)) {
                return u;
            }
        }
        return null;
    }
}
exports.UserStore = UserStore;
