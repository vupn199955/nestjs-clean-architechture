export interface IPoolTokenService {
  addDevice(key: string, accessToken: string, refreshToken: string): Promise<any>;
  getDevices(key: string): Promise<any>;
  removeDevice(key: string, token: string): Promise<any>;
}
