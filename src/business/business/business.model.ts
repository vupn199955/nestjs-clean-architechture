import { BaseModel } from "../core/base.model";
import { BusinessStatus } from "../enum/business-status.enum";

export interface BusinessModel extends BaseModel {
  uuid?: string;
  clientId?: number;
  name: string;
  type?: string;
  logoUrl?: string;
  status?: BusinessStatus;
}
