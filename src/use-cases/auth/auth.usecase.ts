import { IAuthUseCases } from "../../business/auth/auth.usecase";
import { IPoolTokenService } from "../../business/cache/pool-token.service";
import { IJwtService } from "../../business/jwt/jwt.service";
import { UserModel } from "../../business/user/user.model";
import { IUserRepository } from "../../business/user/user.repository";

export class AuthUsecase implements IAuthUseCases {
  constructor(
    private readonly jwtAccessService: IJwtService,
    private readonly jwtRefreshService: IJwtService,
    private readonly userRepository: IUserRepository,
    private readonly poolTokenService: IPoolTokenService,
  ) {}

  async createTokens(user: UserModel, currentRefreshToken?: string) {
    const accessToken = this.jwtAccessService.sign({ ...user });
    const refreshToken = this.jwtRefreshService.sign({ ...user });

    if (currentRefreshToken) {
      await this.poolTokenService.removeDevice(user.uuid, currentRefreshToken);
    }

    await this.poolTokenService.addDevice(user.uuid, accessToken, refreshToken);

    return {
      accessToken,
      refreshToken,
      username: user.name,
    };
  }

  async signIn(firebaseUid: string): Promise<any> {
    const user = await this.userRepository.getUserByFirebaseUid(firebaseUid);
    return this.createTokens(user);
  }

  async signOut(userUid: string, token: string): Promise<any> {
    await this.poolTokenService.removeDevice(userUid, token);
  }

  signOutAll(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async refeshToken(userId: number, refreshToken: string): Promise<any> {
    const user = await this.userRepository.getUserById(userId);

    return this.createTokens(user, refreshToken);
  }
}
