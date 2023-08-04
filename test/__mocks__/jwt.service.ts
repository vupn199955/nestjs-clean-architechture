import { IJwtService } from "../../src/business/jwt/jwt.service";

export class StubJwtService implements IJwtService {
  sign<T extends object>(payload: T): string {
    return "jwt token";
  }
  verify<T extends object>(token: string): T {
    return {
      id: 1,
      email: "user email",
      name: "user name",
      status: "user status",
      firebaseUid: "firebase uid",
      userType: "user type",
      clientId: 1,
    } as T;
  }
}
