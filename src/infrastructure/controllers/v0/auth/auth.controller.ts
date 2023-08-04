import { Controller, Inject, Post, UseGuards, HttpCode, HttpStatus } from "@nestjs/common";
import { UsecasesProxyModule } from "../../../usecases-proxy/usecases-proxy.module";
import { UseCaseProxy } from "../../../usecases-proxy/usecases-proxy";
import { FirebaseUser } from "../../../common/decorator/firebase.decorator";
import {
  ApiTags,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiNoContentResponse,
} from "@nestjs/swagger";
import { IAuthUseCases } from "../../../../business/auth/auth.usecase";
import { SignInPresenter } from "./auth.presenter";
import { FirebaseGuard } from "../../../common/guard/firebase.guard";
import { RefreshGuard } from "../../../common/guard/refresh.guard";
import { Token } from "../../../common/decorator/token.decorator";
import { AccessGuard } from "../../../common/guard/access.guard";
import { IUserBusinessUseCases } from "../../../../business/user-business/user-business.usecase";
import { BusinessModel } from "../../../../business/business/business.model";

@Controller("api/v0/auth")
@ApiTags("auth")
export class AuthController {
  constructor(
    @Inject(UsecasesProxyModule.AUTH_USECASES_PROXY)
    private readonly authUsecaseProxy: UseCaseProxy<IAuthUseCases>,
    @Inject(UsecasesProxyModule.USER_BUSINESS_USECASES_PROXY)
    private readonly userBusinessUsecaseProxy: UseCaseProxy<IUserBusinessUseCases>,
  ) {}

  @Post("/sign-in")
  @HttpCode(HttpStatus.OK)
  @UseGuards(FirebaseGuard)
  @ApiBearerAuth("firebaseTokenId")
  @ApiOperation({ description: "Sign-in" })
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiResponse({ type: SignInPresenter })
  async signIn(@FirebaseUser("uid") firebaseUid: string): Promise<SignInPresenter> {
    const user = await this.authUsecaseProxy.getInstance().signIn(firebaseUid);
    const userBusiness: BusinessModel[] = await this.userBusinessUsecaseProxy
      .getInstance()
      .getBusinessByUserId(user.id);
    return {
      ...user,
      clientName: userBusiness[0].name,
    };
  }

  @Post("/refresh")
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth("refreshToken")
  @UseGuards(RefreshGuard)
  @ApiOperation({ description: "Refresh token" })
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiResponse({ type: SignInPresenter })
  refresh(@FirebaseUser("id") id: number, @Token() token: string): Promise<SignInPresenter> {
    return this.authUsecaseProxy.getInstance().refeshToken(id, token);
  }

  @Post("/sign-out")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiNoContentResponse()
  @UseGuards(AccessGuard)
  @ApiOperation({ description: "Sign out" })
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  signOut(@FirebaseUser("uuid") uuid: string, @Token() token: string): Promise<void> {
    return this.authUsecaseProxy.getInstance().signOut(uuid, token);
  }
}
