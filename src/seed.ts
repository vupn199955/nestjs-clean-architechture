import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SeederModule } from "../database/seeders/seeder.module";
import { ClientSeeder } from "../database/seeders/client.seeder";
import { CustomerSeeder } from "../database/seeders/customer.seeder";

export async function bootstrap() {
  NestFactory.createApplicationContext(SeederModule)
    .then(async (appContext) => {
      const logger = new Logger("SEEDER");
      logger.debug("Starting Seeder");
      const resultClient = await appContext.get(ClientSeeder).seed();
      logger.debug(resultClient.length, "clients seeded");

      const resultCustomer = await appContext.get(CustomerSeeder).seed();
      logger.debug(resultCustomer.length, "clients seeded");

      appContext.close();
    })
    .catch((err) => {
      throw err;
    });
}

bootstrap();
