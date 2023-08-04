import { IPagination } from "../../business/core/pagination.interface";
import { CustomerModel } from "../../business/customer/customer.model";
import { ICustomerRepository } from "../../business/customer/customer.repository";
import { ICustomerUseCases } from "../../business/customer/customer.usecase";

export class CustomerUsecase implements ICustomerUseCases {
  constructor(private readonly customerRepository: ICustomerRepository) {}
  getCustomers(params: IPagination): Promise<{ data: CustomerModel[]; totalItem: number }> {
    return this.customerRepository.getCustomers(params);
  }
}
