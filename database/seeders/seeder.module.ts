import { Module } from "@nestjs/common";
import { ClientSeeder } from "./client.seeder";
import { EnvironmentConfigModule } from "../../src/infrastructure/configs/env.config.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigModule } from "../../src/infrastructure/configs/typeorm.config.module";
import entities from "../../src/infrastructure/entities";
import { CustomerSeeder } from "./customer.seeder";

@Module({
  imports: [
    EnvironmentConfigModule,
    TypeOrmConfigModule,
    TypeOrmModule.forFeature(entities),
  ],
  providers: [ClientSeeder, CustomerSeeder],
})
export class SeederModule {}
