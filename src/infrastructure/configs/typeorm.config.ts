import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import { config } from "dotenv";
import { join } from "path";
import entities from "../entities";

config();
const configService = new ConfigService();
export default new DataSource({
  type: "postgres",
  host: configService.get<string>("PG_HOST"),
  port: configService.get<number>("PG_PORT"),
  username: configService.get<string>("PG_USER"),
  password: configService.get<string>("PG_PASSWORD"),
  database: configService.get<string>("PG_DATABASE"),
  entities,
  migrations: [join(process.cwd(), "database/migrations/*.ts")],
});
