import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as morgan from "morgan";
import {
  BadRequestException,
  HttpStatus,
  Logger,
  ValidationError,
  ValidationPipe,
} from "@nestjs/common";
import { ResponseFormatter } from "./infrastructure/common/interceptor/success-formatter.interceptor";
import { AppModule } from "./app.module";
import { ControllersModule } from "./infrastructure/controllers/controllers.module";
import { HttpExceptionFilter } from "./infrastructure/common/filters/http-exception.filter";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { EnvironmentConfigService } from "./infrastructure/configs/env.config.service";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(EnvironmentConfigService);
  const appLogger = new Logger("NestApplication");
  const reqLogger = new Logger("IncomingRequest");

  app.useStaticAssets(join(__dirname, "../..", "public"), {
    index: false,
  });

  app.enableCors({
    origin: "*",
  });

  app.useGlobalInterceptors(new ResponseFormatter());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(
    morgan("combined", {
      stream: {
        write: (message) => reqLogger.verbose(message),
      },
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map((error) => {
          const { property, constraints } = error;

          const keys = Object.keys(constraints);

          const msgs: string[] = [];

          keys.forEach((key) => {
            msgs.push(`${constraints[key]}`);
          });

          return {
            property,
            errors: msgs,
          };
        });

        throw new BadRequestException(messages);
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle("project-name APIs")
    .setDescription("The project-name API description")
    .addBearerAuth({ type: "http", scheme: "bearer", bearerFormat: "JWT" })
    .addBearerAuth({ type: "http", scheme: "bearer", bearerFormat: "JWT" }, "firebaseTokenId")
    .addBearerAuth({ type: "http", scheme: "bearer", bearerFormat: "JWT" }, "refreshToken")
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [ControllersModule],
    deepScanRoutes: true,
  });

  SwaggerModule.setup("swagger", app, document);

  const port = configService.getAppPort();
  await app.listen(port || 3000);
  appLogger.log(`Application is running on port ${port}`);
}
bootstrap();
