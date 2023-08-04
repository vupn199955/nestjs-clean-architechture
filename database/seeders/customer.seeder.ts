import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Customer } from "../../src/infrastructure/entities/customer.entity";
import { CustomerModel } from "../../src/business/customer/customer.model";

@Injectable()
export class CustomerSeeder extends Repository<Customer> {
  constructor(@InjectRepository(Customer) private readonly repository: Repository<Customer>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
  seed() {
    const list: CustomerModel[] = [];
    for (let i = 0; i < 100; i++) {
      list.push({
        address: "HCM",
        email: "customer" + i + "@gmail.com",
        firstName: "Customer " + i,
        lastName: "Customer " + i,
        imageUrl: "",
        location: "",
        postcode: "",
        birthDate: new Date(),
        hasLine: false,
      });
    }
    return this.repository.save(list);
  }
}
