import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IUserBusinessRepository } from "../../business/user-business/user-business.repository";
import { UserBusiness } from "../entities/user-business.entity";

@Injectable()
export class UserBusinessRepository
  extends Repository<UserBusiness>
  implements IUserBusinessRepository
{
  constructor(
    @InjectRepository(UserBusiness) private readonly repository: Repository<UserBusiness>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
  getUserBusiness(userId: number): Promise<any> {
    return this.repository.find({
      select: ["id", "userId", "businessId", "business"],
      where: {
        userId,
      },
      relations: ["business"],
    });
  }
  createUserBusiness(userId: number, businessId: number): Promise<UserBusiness> {
    return this.repository.save({ userId, businessId });
  }
}
