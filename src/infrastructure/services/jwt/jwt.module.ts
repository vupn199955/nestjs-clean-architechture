import { Module, Global } from "@nestjs/common";
import { JWT_ACCESS_SERVICE, JWT_REFRESH_SERVICE } from "../../../business/constant/jwt.const";
import { JwtService } from "./jwt.service";
import { EnvironmentConfigService } from "../../configs/env.config.service";
@Global()
@Module({
  providers: [
    {
      provide: JWT_ACCESS_SERVICE,
      useFactory: (configService: EnvironmentConfigService): JwtService =>
        new JwtService(configService.getJwtAccessSecret(), {
          expiresIn: configService.getJwtAccessExpirationTime(),
        }),
      inject: [EnvironmentConfigService],
    },
    {
      provide: JWT_REFRESH_SERVICE,
      useFactory: (configService: EnvironmentConfigService): JwtService =>
        new JwtService(configService.getJwtRefreshSecret(), {
          expiresIn: configService.getJwtRefreshExpirationTime(),
        }),
      inject: [EnvironmentConfigService],
    },
  ],
  exports: [JWT_ACCESS_SERVICE, JWT_REFRESH_SERVICE],
})
export class JwtModule {}
