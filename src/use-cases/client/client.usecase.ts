import { ConflictException } from "@nestjs/common";
import { IBusinessRepository } from "../../business/business/buniness.repository";
import { BusinessModel } from "../../business/business/business.model";
import { ClientModel } from "../../business/client/client.model";
import { IClientRepository } from "../../business/client/client.repository";
import { IClientUseCases } from "../../business/client/client.usecases";
import { IUserBusinessRepository } from "../../business/user-business/user-business.repository";
import { UserModel } from "../../business/user/user.model";
import { IUserRepository } from "../../business/user/user.repository";
import { ErrorMessage } from "../../business/enum/error-message.enum";

export class ClientUseCases implements IClientUseCases {
  constructor(
    private readonly clientRepository: IClientRepository,
    private readonly businessRepository: IBusinessRepository,
    private readonly userRepository: IUserRepository,
    private readonly userBusinessRepository: IUserBusinessRepository,
  ) {}

  getClient(id: number): Promise<ClientModel> {
    return this.clientRepository.getClient(id);
  }

  async createClient(
    client: ClientModel,
    business: BusinessModel,
    user: UserModel,
  ): Promise<{
    user: UserModel;
    business: BusinessModel;
    client: ClientModel;
  }> {
    const isUserExist = await this.userRepository.isUserExist(user.email);
    if (isUserExist) {
      throw new ConflictException(ErrorMessage.USER_AREADY_EXISTS);
    }

    const _client = await this.clientRepository.createClient(client);
    const _business = await this.businessRepository.createBusiness({
      ...business,
      clientId: _client.id,
    });
    const _user = await this.userRepository.createUser({
      ...user,
      businessId: _business.id,
      clientId: _client.id,
    });

    await this.userBusinessRepository.createUserBusiness(_user.id, _business.id);
    return {
      user: _user,
      business: _business,
      client: _client,
    };
  }
}
