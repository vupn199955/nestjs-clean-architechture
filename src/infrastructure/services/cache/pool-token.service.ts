import { Injectable } from "@nestjs/common";

import * as moment from "moment";
import * as ms from "ms";
import { IPoolTokenService } from "../../../business/cache/pool-token.service";
import { CacheService } from "./cache.service";
import { EnvironmentConfigService } from "../../configs/env.config.service";

@Injectable()
export class PoolTokenService implements IPoolTokenService {
  private cacheTimer: number;
  constructor(
    private readonly cacheService: CacheService,
    private readonly configService: EnvironmentConfigService,
  ) {
    const timer = this.configService.getJwtRefreshExpirationTime();
    this.cacheTimer = ms(timer);
  }

  async addDevice(key: string, accessToken: string, refreshToken: string): Promise<void> {
    const expiresIn = moment().add(this.cacheTimer, "ms").toISOString();
    const devices = await this.getDevices(key);
    devices.push({ accessToken, refreshToken, expiresIn });

    await this.cacheService.set(key, devices, this.cacheTimer);
  }

  async getDevices(key: string): Promise<any> {
    let devices = await this.cacheService.get<any[]>(key);

    if (!devices) {
      devices = [];
    }

    return devices.filter((device) => moment(device.expiresIn).isAfter(moment()));
  }

  async removeDevice(key: string, token: string): Promise<void> {
    const devices = await this.getDevices(key);

    await this.cacheService.set(
      key,
      devices.filter((device) => device.accessToken !== token && device.refreshToken !== token),
      this.cacheTimer,
    );
  }
}
