import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IUserRepository } from "../../business/user/user.repository";
import { User } from "../entities/user.entity";

@Injectable()
export class UserRepository extends Repository<User> implements IUserRepository {
  constructor(@InjectRepository(User) private readonly repository: Repository<User>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
  getUserByFirebaseUid(firebaseUid: string): Promise<any> {
    return this.repository.findOne({
      where: { firebaseUid },
      select: ["id", "email", "clientId", "name", "userType", "uuid", "userBusiness"],
      relations: ["userBusiness", "userBusiness.business"],
    });
  }

  createUser(user: User): Promise<User> {
    return this.repository.save(user);
  }

  isUserExist(email: string): Promise<boolean> {
    return this.repository.findAndCount({ where: { email } }).then(([, count]) => count > 0);
  }

  getUserById(id: number): Promise<User> {
    return this.repository.findOneOrFail({
      where: { id },
      select: ["id", "email", "clientId", "name", "userType", "uuid"],
    });
  }
}
