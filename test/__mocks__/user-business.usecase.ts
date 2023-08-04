import { BusinessModel } from "../../src/business/business/business.model";
import { BusinessStatus } from "../../src/business/enum/business-status.enum";
import { IUserBusinessUseCases } from "../../src/business/user-business/user-business.usecase";

export class StubUserBusinessUsecase implements IUserBusinessUseCases {
  getBusinessByUserId(userId: number): Promise<BusinessModel[]> {
    return Promise.resolve([
      {
        id: 1,
        name: "business1",
        address: "address1",
        phone: "phone1",
        email: "email1",
        website: "website1",
        description: "description1",
        status: BusinessStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
}
