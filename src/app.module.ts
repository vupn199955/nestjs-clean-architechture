import { Module } from "@nestjs/common";
import { ControllersModule } from "./infrastructure/controllers/controllers.module";
import { CacheModule } from "./infrastructure/services/cache/cache.module";
import { EnvironmentConfigModule } from "./infrastructure/configs/env.config.module";

@Module({
  imports: [EnvironmentConfigModule, CacheModule, ControllersModule],
})
export class AppModule {}
