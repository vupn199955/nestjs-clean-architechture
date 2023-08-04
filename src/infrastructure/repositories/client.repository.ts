import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Client } from "../entities/client.entity";
import { IClientRepository } from "../../business/client/client.repository";

@Injectable()
export class ClientRepository extends Repository<Client> implements IClientRepository {
  constructor(@InjectRepository(Client) private readonly repository: Repository<Client>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  getClient(clientId: number): Promise<any> {
    return this.repository.findOne({
      where: {
        id: clientId,
      },
      select: ["id", "name", "status", "uuid", "createdAt", "updatedAt"],
    });
  }

  createClient(client: Client): Promise<Client> {
    return this.repository.save(client);
  }
}
