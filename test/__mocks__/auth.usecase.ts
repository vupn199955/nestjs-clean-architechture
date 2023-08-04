import { IAuthUseCases } from "../../src/business/auth/auth.usecase";

export class StubAuthUsecase implements IAuthUseCases {
  async signIn(firebaseUid: string): Promise<any> {
    return {
      accessToken: "accessToken",
      refreshToken: "refreshToken",
      username: "username",
    };
  }
  signOut(userUid: string, token: string): Promise<any> {
    return Promise.resolve("OK");
  }
  signOutAll(): Promise<any> {
    return Promise.resolve("OK");
  }
  async refeshToken(userId: number, refreshToken: string): Promise<any> {
    return {
      accessToken: "accessToken",
      refreshToken: "refreshToken",
      username: "username",
    };
  }
}
