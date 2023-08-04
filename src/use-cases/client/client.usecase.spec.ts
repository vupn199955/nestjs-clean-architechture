import { IBusinessRepository } from "../../business/business/buniness.repository";
import { IClientRepository } from "../../business/client/client.repository";
import { IClientUseCases } from "../../business/client/client.usecases";
import { BusinessStatus } from "../../business/enum/business-status.enum";
import { ClientStatus } from "../../business/enum/client-status.enum";
import { UserStatus } from "../../business/enum/user-status.enum";
import { UserType } from "../../business/enum/user-type.enum";
import { IUserBusinessRepository } from "../../business/user-business/user-business.repository";
import { IUserRepository } from "../../business/user/user.repository";
import { ClientUseCases } from "./client.usecase";
import { ErrorMessage } from "../../business/enum/error-message.enum";

describe("Client usecase", () => {
  const clientRepository: IClientRepository = {
    createClient: jest.fn(),
    getClient: jest.fn(),
  };
  const businessRepository: IBusinessRepository = {
    createBusiness: jest.fn(),
  };
  const userRepository: IUserRepository = {
    createUser: jest.fn(),
    isUserExist: jest.fn(),
    getUserByFirebaseUid: jest.fn(),
    getUserById: jest.fn(),
  };
  const userBusinessRepository: IUserBusinessRepository = {
    createUserBusiness: jest.fn(),
    getUserBusiness: jest.fn(),
  };
  let clientUseCases: IClientUseCases;

  const client = {
    id: 1,
    name: "client name",
    status: ClientStatus.ACTIVE,
  };

  const business = {
    id: 1,
    clientId: 1,
    name: "business name",
    status: BusinessStatus.ACTIVE,
    logoUrl: "business logo url",
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

  const userBusiness = {
    userId: "user id",
    businessId: "business id",
    id: 1,
  };

  beforeEach(async () => {
    clientUseCases = new ClientUseCases(
      clientRepository,
      businessRepository,
      userRepository,
      userBusinessRepository,
    );
  });

  describe("createClient", () => {
    it("Should return error: USER_AREADY_EXISTS", async () => {
      jest.spyOn(userRepository, "isUserExist").mockResolvedValue(true);
      const request = clientUseCases.createClient(client, business, user);
      await expect(request).rejects.toMatchObject({
        message: ErrorMessage.USER_AREADY_EXISTS,
      });
    });

    it("Should return user object", async () => {
      jest.spyOn(userRepository, "isUserExist").mockResolvedValue(false);
      jest.spyOn(clientRepository, "createClient").mockResolvedValue(client);
      jest.spyOn(businessRepository, "createBusiness").mockResolvedValue(business);
      jest.spyOn(userBusinessRepository, "createUserBusiness").mockResolvedValue(userBusiness);
      jest.spyOn(userRepository, "createUser").mockResolvedValue(user);

      const request = clientUseCases.createClient(client, business, user);
      await expect(request).resolves.toMatchObject({
        user,
        business,
        client,
      });
    });
  });
});
