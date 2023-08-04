import { IPagination } from "../core/pagination.interface";
import { CustomerModel } from "./customer.model";

export interface ICustomerRepository {
  getCustomers(params: IPagination): Promise<{
    data: CustomerModel[];
    totalItem: number;
  }>;
}
