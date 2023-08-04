import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import entities from "../entities";
import { EnvironmentConfigService } from "./env.config.service";
import { Environment } from "../../business/enum/env.enum";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (env: EnvironmentConfigService) => ({
        type: "postgres",
        host: env.getDatabaseHost(),
        port: env.getDatabasePort(),
        username: env.getDatabaseUser(),
        password: env.getDatabasePassword(),
        database: env.getDatabaseName(),
        autoLoadEntities: true,
        synchronize: false,
        migrationsRun: env.getNodeEnv() === Environment.Production,
        migrations: [__dirname + "../../../database/migrations/*.ts"],
        entities,
        extra: {
          connectionLimit: 10,
        },
      }),
      inject: [EnvironmentConfigService],
    }),
  ],
})
export class TypeOrmConfigModule {}
