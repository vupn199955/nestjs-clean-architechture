import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DatabaseConfig } from "../../business/config/database.config";
import { RedisConfig } from "../../business/config/redis.config";
import { FirebaseConfig } from "../../business/config/firebase.config";
import { JwtConfig } from "../../business/config/jwt.config";
import { BitlyConfig } from "../../business/config/bitly.config";

@Injectable()
export class EnvironmentConfigService
  implements DatabaseConfig, RedisConfig, FirebaseConfig, JwtConfig, BitlyConfig
{
  constructor(private configService: ConfigService) {}
  getBitlyAccessToken(): string {
    return this.configService.get<string>("BITLY_ACCESS_TOKEN");
  }
  getNodeEnv(): string {
    return this.configService.get<string>("NODE_ENV");
  }
  getAppPort(): number {
    return this.configService.get<number>("APP_PORT");
  }
  getDatabaseHost(): string {
    return this.configService.get<string>("PG_HOST");
  }
  getDatabasePort(): number {
    return this.configService.get<number>("PG_PORT");
  }
  getDatabaseUser(): string {
    return this.configService.get<string>("PG_USER");
  }
  getDatabasePassword(): string {
    return this.configService.get<string>("PG_PASSWORD");
  }
  getDatabaseName(): string {
    return this.configService.get<string>("PG_DATABASE");
  }
  getRedisHost(): string {
    return this.configService.get<string>("REDIS_HOST");
  }
  getRedisPort(): number {
    return this.configService.get<number>("REDIS_PORT");
  }
  getRedisUrl(): string {
    return this.configService.get<string>("CACHE_REDIS_URL");
  }
  getFirebaseClientEmail(): string {
    return this.configService.get<string>("FIREBASE_CLIENT_EMAIL");
  }
  getFirebaseProjectId(): string {
    return this.configService.get<string>("FIREBASE_PROJECT_ID");
  }
  getFirebasePrivateKey(): string {
    return this.configService.get<string>("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n");
  }
  getFirebasePrivateKeyId(): string {
    return this.configService.get<string>("FIREBASE_PRIVATE_KEY_ID");
  }
  getFirebaseClientID(): string {
    return this.configService.get<string>("FIREBASE_CLIENT_ID");
  }
  getJwtAccessSecret(): string {
    return this.configService.get<string>("JWT_ACCESS_KEY");
  }
  getJwtAccessExpirationTime(): string {
    return this.configService.get<string>("JWT_ACCESS_TIMER") || "15m";
  }
  getJwtRefreshSecret(): string {
    return this.configService.get<string>("JWT_REFRESH_KEY");
  }
  getJwtRefreshExpirationTime(): string {
    return this.configService.get<string>("JWT_REFRESH_TIMER") || "7d";
  }
}
