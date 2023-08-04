import { IUserBusinessRepository } from "../../business/user-business/user-business.repository";
import { IUserBusinessUseCases } from "../../business/user-business/user-business.usecase";

export class UserBusinessUsecase implements IUserBusinessUseCases {
  constructor(private readonly userBusinessRepository: IUserBusinessRepository) {}

  async getBusinessByUserId(userId: number): Promise<any> {
    const result = await this.userBusinessRepository.getUserBusiness(userId);
    return result.map((item) => (item.business ? item.business : null));
  }
}
