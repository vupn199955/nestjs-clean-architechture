import { Controller, Get, HttpCode, HttpStatus, Inject, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { UseCaseProxy } from "../../../usecases-proxy/usecases-proxy";
import { UsecasesProxyModule } from "../../../usecases-proxy/usecases-proxy.module";
import { IUserBusinessUseCases } from "../../../../business/user-business/user-business.usecase";
import { FirebaseUser } from "../../../common/decorator/firebase.decorator";
import { AccessGuard } from "../../../common/guard/access.guard";
import { BusinessPresenter, GetBusinessPresenter } from "./business.presenter";

@Controller("api/v0/business")
@ApiTags("business")
@ApiBearerAuth()
@UseGuards(AccessGuard)
export class BusinessController {
  constructor(
    @Inject(UsecasesProxyModule.USER_BUSINESS_USECASES_PROXY)
    private readonly userBusinessUsecaseProxy: UseCaseProxy<IUserBusinessUseCases>,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: GetBusinessPresenter })
  @ApiUnauthorizedResponse()
  getBusinessByUserId(@FirebaseUser("id") userId: number): Promise<BusinessPresenter[]> {
    return this.userBusinessUsecaseProxy.getInstance().getBusinessByUserId(userId);
  }
}
