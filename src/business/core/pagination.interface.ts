import { Order } from "../enum/order.enum";

export interface IPagination {
  take?: number;
  page?: number;
  sortBy?: string;
  order?: Order;
  skip?: number;
}
