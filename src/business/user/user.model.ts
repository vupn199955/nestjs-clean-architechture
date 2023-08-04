import { BaseModel } from "../core/base.model";
import { UserStatus } from "../enum/user-status.enum";
import { UserType } from "../enum/user-type.enum";

export interface UserModel extends BaseModel {
  uuid?: string;
  firebaseUid?: string;
  clientId?: number;
  name?: string;
  email?: string;
  userType?: UserType;
  status: UserStatus;
}
