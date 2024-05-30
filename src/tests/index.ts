import { OrderInput, OrderProductInput, OrderStatus } from "../models/orders";
import { ProductInput } from "../models/products";
import { UserInput } from "../models/users";

export const testUser: UserInput = {
  firstname: 'Jane',
  lastname: 'Doe',
  password: 'securePassword123',
}

export const testOrder: OrderInput = {
  user_id: 1,
  status: OrderStatus.ACTIVE,
}

export const testOrder2: OrderInput = {
  user_id: 2,
  status: OrderStatus.ACTIVE,
}

export const testProduct: ProductInput = {
  name: 'AK-47',
  price: 1200,
  category: 'guns',
}

export const testOrderProduct: OrderProductInput = {
  order_id: 1,
  product_id: 1,
  quantity: 3,
};

export let token: string = "";

export function setToken(value: string) {
  token = value;
}