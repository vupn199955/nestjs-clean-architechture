import { ICacheService } from "../../src/business/cache/cache.service";

export class StubCacheService implements ICacheService {
  set(key: string, value: any, duration?: number): Promise<string> {
    return Promise.resolve("OK");
  }
  get(key: string): Promise<any> {
    return Promise.resolve(null);
  }
  remove(key: string): Promise<string> {
    return Promise.resolve("OK");
  }
}
