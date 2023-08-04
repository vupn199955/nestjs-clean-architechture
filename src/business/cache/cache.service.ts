export interface ICacheService {
  set(key: string, value: any, duration?: number): Promise<string>;
  get(key: string): Promise<any>;
  remove(key: string): Promise<string>;
}
