import { Injectable } from "@nestjs/common";
import { createClient, RedisClientType } from "redis";

import { ICacheService } from "../../../business/cache/cache.service";
import { EnvironmentConfigService } from "../../configs/env.config.service";
import { Environment } from "../../../business/enum/env.enum";

@Injectable()
export class CacheService implements ICacheService {
  private client: RedisClientType;
  constructor(private readonly configService: EnvironmentConfigService) {
    if (this.configService.getNodeEnv() !== Environment.Test) {
      this.client = createClient({
        url: this.configService.getRedisUrl(),
      });
      this.client.on("error", (err) => console.log("Redis Client Error", err));
      this.client.connect();
    }
  }

  async set<T>(key: string, value: T, duration?: number): Promise<string> {
    return this.client.set(key, JSON.stringify(value), {
      PX: duration,
    });
  }

  async get<T extends object>(key: string): Promise<T> {
    const result = await this.client.get(key);
    try {
      return JSON.parse(result);
    } catch {
      return null;
    }
  }

  async remove(key: string): Promise<string> {
    return this.client.set(key, JSON.stringify(null));
  }
}
