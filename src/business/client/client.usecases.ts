import { BusinessModel } from "../business/business.model";
import { UserModel } from "../user/user.model";
import { ClientModel } from "./client.model";

export interface IClientUseCases {
  createClient(client: ClientModel, business: BusinessModel, user: UserModel): Promise<any>;
  getClient(id: number): Promise<any>;
}
