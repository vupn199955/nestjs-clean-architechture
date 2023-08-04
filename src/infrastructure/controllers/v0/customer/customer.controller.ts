import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Query,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { UseCaseProxy } from "../../../usecases-proxy/usecases-proxy";
import { UsecasesProxyModule } from "../../../usecases-proxy/usecases-proxy.module";
import { ICustomerUseCases } from "../../../../business/customer/customer.usecase";
import { CustomerPresenter } from "./customer.presenter";
import { AccessGuard } from "../../../common/guard/access.guard";
import { PaginationPresenter, PaginationMetaPresenter } from "../../pagination.presenter";
import { PaginationOptionsDto } from "../../pagination-options.dto";

@Controller("api/v0/customer")
@ApiTags("customer")
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class CustomerController {
  constructor(
    @Inject(UsecasesProxyModule.CUSTOMER_USECASES_PROXY)
    private readonly customerUsecaseProxy: UseCaseProxy<ICustomerUseCases>,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessGuard)
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ type: PaginationPresenter<CustomerPresenter> })
  @ApiOperation({ description: "Get customers" })
  async getCustomers(
    @Query() paginationOptionsDto: PaginationOptionsDto,
  ): Promise<PaginationPresenter<CustomerPresenter>> {
    const { data, totalItem } = await this.customerUsecaseProxy
      .getInstance()
      .getCustomers(paginationOptionsDto);
    const pageMetaDto = new PaginationMetaPresenter({ totalItem, paginationOptionsDto });
    return new PaginationPresenter(data, pageMetaDto);
  }
}
