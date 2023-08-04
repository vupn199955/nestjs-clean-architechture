import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Business } from "../entities/business.entity";
import { IBusinessRepository } from "../../business/business/buniness.repository";

@Injectable()
export class BusinessRepository extends Repository<Business> implements IBusinessRepository {
  constructor(@InjectRepository(Business) private readonly repository: Repository<Business>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
  createBusiness(business: Business): Promise<Business> {
    return this.repository.save(business);
  }
}
