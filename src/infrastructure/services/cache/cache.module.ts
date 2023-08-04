import { Module, Global } from "@nestjs/common";
import { CacheService } from "./cache.service";
import { PoolTokenService } from "./pool-token.service";

@Global()
@Module({
  providers: [CacheService, PoolTokenService],
  exports: [CacheService, PoolTokenService],
})
export class CacheModule {}
