import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { UsecasesProxyModule } from "../../../usecases-proxy/usecases-proxy.module";
import { UseCaseProxy } from "../../../usecases-proxy/usecases-proxy";
import { IClientUseCases } from "../../../../business/client/client.usecases";
import { FirebaseGuard } from "../../../common/guard/firebase.guard";
import { FirebaseUser } from "../../../common/decorator/firebase.decorator";
import { ClientSignUpDto } from "./client.dto";
import { ClientPresenter, ClientSignUpPresenter, GetClientPresenter } from "./client.presenter";
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiOkResponse,
} from "@nestjs/swagger";
import { IFirebaseUser } from "../../../../business/core/firebase-user.model";
import { BusinessStatus } from "../../../../business/enum/business-status.enum";
import { ClientStatus } from "../../../../business/enum/client-status.enum";
import { UserStatus } from "../../../../business/enum/user-status.enum";
import { UserType } from "../../../../business/enum/user-type.enum";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { getFileName } from "../../../utils/string";
import { AccessGuard } from "../../../common/guard/access.guard";

@Controller("api/v0/client")
@ApiTags("client")
export class ClientController {
  constructor(
    @Inject(UsecasesProxyModule.CLIENT_USECASES_PROXY)
    private readonly clientUsecaseProxy: UseCaseProxy<IClientUseCases>,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ description: "Get client" })
  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  @ApiOkResponse({ type: GetClientPresenter })
  public async getClient(@FirebaseUser("clientId") clientId: number): Promise<ClientPresenter> {
    return this.clientUsecaseProxy.getInstance().getClient(clientId);
  }

  @Post("/sign-up")
  @ApiOperation({ description: "Client sign-up" })
  @ApiBearerAuth("firebaseTokenId")
  @ApiBadRequestResponse({ description: "Bad request" })
  @ApiCreatedResponse({ type: ClientSignUpPresenter })
  @UseGuards(FirebaseGuard)
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      required: ["businessName", "name"],
      properties: {
        businessLogo: {
          type: "string",
          format: "binary",
        },
        businessName: {
          type: "string",
        },
        name: {
          type: "string",
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor("businessLogo", {
      storage: diskStorage({
        destination: "public/business-logo",
        filename: (_, file, cb) => {
          return cb(null, getFileName(file.originalname));
        },
      }),
    }),
  )
  public async clientSignUp(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png)$/,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    businessLogo: Express.Multer.File,
    @Body() client: ClientSignUpDto,
    @FirebaseUser() firebaseUser: IFirebaseUser,
  ): Promise<ClientPresenter> {
    return this.clientUsecaseProxy.getInstance().createClient(
      {
        name: client.name,
        status: ClientStatus.ACTIVE,
      },
      {
        name: client.businessName,
        status: BusinessStatus.ACTIVE,
        logoUrl: businessLogo ? "/business-logo/" + businessLogo.originalname : "",
      },
      {
        email: firebaseUser.email,
        name: client.name,
        status: UserStatus.ACTIVE,
        firebaseUid: firebaseUser.uid,
        userType: UserType.OWNER,
      },
    );
  }
}
