import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Utm } from "../entities/utm.entity";
import { IUtmRepository } from "../../business/utm/utm.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { UtmModel } from "../../business/utm/utm.model";

@Injectable()
export class UtmRepository extends Repository<Utm> implements IUtmRepository {
  constructor(@InjectRepository(Utm) private readonly repository: Repository<Utm>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  createUtm(utm: UtmModel): Promise<UtmModel> {
    return this.repository.save(utm);
  }

  getUtm(utmId: number): Promise<Utm> {
    return this.repository.findOneOrFail({
      where: { id: utmId },
    });
  }
}
