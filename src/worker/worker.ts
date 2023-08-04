import { NestFactory } from "@nestjs/core";
// import { NestExpressApplication } from "@nestjs/platform-express";
// import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { WorkerModule } from "./worker.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(WorkerModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>("WORKER_PORT");
  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.listen(port || 3005);
}
bootstrap();
