import { Test, TestingModule } from "@nestjs/testing";
import { ClientController } from "./client.controller";
import { UsecasesProxyModule } from "../../../usecases-proxy/usecases-proxy.module";
import { ClientSignUpDto } from "./client.dto";
import { IFirebaseUser } from "../../../../business/core/firebase-user.model";
import { UserStatus } from "../../../../business/enum/user-status.enum";
import { UserType } from "../../../../business/enum/user-type.enum";
import { FirebaseService } from "../../../services/firebase/firebase.service";
import { JWT_ACCESS_SERVICE } from "../../../../business/constant/jwt.const";
import { PoolTokenService } from "../../../services/cache/pool-token.service";
import { CacheService } from "../../../services/cache/cache.service";
import { StubCacheService } from "../../../../../test/__mocks__/cache.service";
import { StubJwtService } from "../../../../../test/__mocks__/jwt.service";
import { StubPoolTokenService } from "../../../../../test/__mocks__/pool-token.service";

describe("ClientController", () => {
  let clientController: ClientController;
  let clientUseCasesProxy;

  const client: ClientSignUpDto = {
    businessName: "",
    name: "",
  };

  const firebaseUser: IFirebaseUser = {
    name: "",
    picture: "",
    iss: "",
    aud: "",
    auth_time: 0,
    user_id: "",
    sub: "",
    iat: 0,
    exp: 0,
    email: "",
    email_verified: false,
    firebase: undefined,
    uid: "",
  };

  const user = {
    id: 1,
    email: "user email",
    name: "user name",
    status: UserStatus.ACTIVE,
    firebaseUid: "firebase uid",
    userType: UserType.OWNER,
    clientId: 1,
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [
        FirebaseService,
        {
          provide: UsecasesProxyModule.CLIENT_USECASES_PROXY,
          useValue: {
            getInstance: () => ({
              createClient: jest.fn(),
            }),
          },
        },
        {
          provide: JWT_ACCESS_SERVICE,
          useClass: StubJwtService,
        },
        {
          provide: PoolTokenService,
          useClass: StubPoolTokenService,
        },
        {
          provide: CacheService,
          useClass: StubCacheService,
        },
      ],
    })
      .overrideProvider(FirebaseService)
      .useValue({})
      .compile();

    clientController = app.get<ClientController>(ClientController);
    clientUseCasesProxy = app.get(UsecasesProxyModule.CLIENT_USECASES_PROXY);
  });

  describe("clientSignUp", () => {
    it("should return a user", async () => {
      jest.spyOn(clientUseCasesProxy, "getInstance").mockReturnValue({
        createClient: jest.fn().mockResolvedValue(user),
      });
      await expect(
        clientController.clientSignUp(null, client, firebaseUser),
      ).resolves.toMatchObject(user);
    });

    it("should return error", async () => {
      jest.spyOn(clientUseCasesProxy, "getInstance").mockReturnValue({
        createClient: jest.fn().mockRejectedValue(new Error("error")),
      });
      await expect(clientController.clientSignUp(null, client, firebaseUser)).rejects.toMatchObject(
        {
          message: "error",
        },
      );
    });
  });
});
