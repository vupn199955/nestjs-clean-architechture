import { BaseModel } from "../core/base.model";
import { ClientStatus } from "../enum/client-status.enum";

export interface ClientModel extends BaseModel {
  uuid?: string;
  name: string;
  status: ClientStatus;
}
