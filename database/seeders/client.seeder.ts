import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Client } from "../../src/infrastructure/entities/client.entity";
import { ClientStatus } from "../../src/business/enum/client-status.enum";

@Injectable()
export class ClientSeeder extends Repository<Client> {
  constructor(@InjectRepository(Client) private readonly repository: Repository<Client>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
  seed() {
    return this.repository.save([
      {
        businessLogo:
          "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
        businessName: "Google",
        status: ClientStatus.ACTIVE,
        businessType: "Search Engine",
      },
    ]);
  }
}
