import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientRepository } from "./client.repository";
import { TypeOrmConfigModule } from "../configs/typeorm.config.module";
import entities from "../entities";
import { BusinessRepository } from "./business.repository";
import { UserRepository } from "./user.repositoty";
import { UserBusinessRepository } from "./user-business.repository";
import { CustomerRepository } from "./customer.repository";

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature(entities)],
  providers: [
    ClientRepository,
    BusinessRepository,
    UserRepository,
    UserBusinessRepository,
    CustomerRepository,
  ],
  exports: [
    ClientRepository,
    BusinessRepository,
    UserRepository,
    UserBusinessRepository,
    CustomerRepository,
  ],
})
export class RepositoriesModule {}
