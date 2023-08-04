import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { ICustomerRepository } from "../../business/customer/customer.repository";
import { Customer } from "../entities/customer.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { IPagination } from "../../business/core/pagination.interface";
import { CustomerModel } from "../../business/customer/customer.model";
import { Order } from "../../business/enum/order.enum";

@Injectable()
export class CustomerRepository extends Repository<Customer> implements ICustomerRepository {
  constructor(@InjectRepository(Customer) private readonly repository: Repository<Customer>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
  async getCustomers(params: IPagination): Promise<{ data: CustomerModel[]; totalItem: number }> {
    const query: any = {
      take: params.take,
      skip: params.skip,
    };

    if (params?.sortBy) {
      query.order = {
        [params.sortBy]: params.order || Order.ASC,
      };
    }

    const [customers, total] = await this.repository.findAndCount({
      ...query,
    });

    return {
      data: customers,
      totalItem: total,
    };
  }
}
