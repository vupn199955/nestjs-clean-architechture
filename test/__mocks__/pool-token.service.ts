import { IPoolTokenService } from "../../src/business/cache/pool-token.service";

export class StubPoolTokenService implements IPoolTokenService {
  addDevice(key: string, accessToken: string, refreshToken: string): Promise<any> {
    return Promise.resolve("OK");
  }
  getDevices(key: string): Promise<any> {
    return Promise.resolve([
      {
        accessToken: "accessToken",
        refreshToken: "refreshToken",
        uuid: "uuid",
      },
    ]);
  }
  removeDevice(key: string, token: string): Promise<any> {
    return Promise.resolve("OK");
  }
}
