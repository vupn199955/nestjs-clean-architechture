import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "../../../config";
import { EnvironmentConfigService } from "./env.config.service";
import validationSchema from "./env.config.validation";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
      ignoreEnvFile: false,
      load: [configuration],
      validationSchema,
    }),
  ],
  providers: [EnvironmentConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}
