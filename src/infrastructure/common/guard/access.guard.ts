import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { JWT_ACCESS_SERVICE } from "../../../business/constant/jwt.const";
import { ErrorMessage } from "../../../business/enum/error-message.enum";
import { JwtService } from "../../services/jwt/jwt.service";
import { PoolTokenService } from "../../services/cache/pool-token.service";

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    @Inject(JWT_ACCESS_SERVICE)
    private jwtService: JwtService,
    private poolTokenService: PoolTokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request?.headers?.authorization?.split(" ")[1];

    if (!token) {
      throw new UnauthorizedException(ErrorMessage.EMPTY_TOKEN);
    }

    request["user"] = this.jwtService.verify(token);

    if (!request["user"]) {
      throw new UnauthorizedException(ErrorMessage.INVALID_TOKEN);
    }

    const devices = await this.poolTokenService.getDevices(request["user"].uuid);

    let exists = false;

    for (const device of devices) {
      if (device.accessToken === token) {
        exists = true;
        break;
      }
    }

    if (!exists) {
      throw new UnauthorizedException(ErrorMessage.NOT_ACTUAL_TOKEN);
    }

    return true;
  }
}
