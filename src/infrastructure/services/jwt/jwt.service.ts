import { Injectable } from "@nestjs/common";
import { sign, verify, SignOptions, VerifyOptions } from "jsonwebtoken";
import { IJwtService } from "../../../business/jwt/jwt.service";

@Injectable()
export class JwtService implements IJwtService {
  constructor(
    private readonly secret: string,
    private readonly signOpts: SignOptions = {},
    private readonly verifyOpts: VerifyOptions = {},
  ) {}

  sign<T extends object>(payload: T): string {
    return sign({ ...payload }, this.secret, this.signOpts);
  }

  verify<T extends object>(token: string): T {
    return verify(token, this.secret, this.verifyOpts) as T;
  }
}
