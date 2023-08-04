import { ApiProperty } from "@nestjs/swagger";
import { UserStatus } from "../../../../business/enum/user-status.enum";
import { UserType } from "../../../../business/enum/user-type.enum";
import { UserModel } from "../../../../business/user/user.model";

export class UserPresenter implements UserModel {
  @ApiProperty()
  uuid?: string;
  @ApiProperty()
  firebaseUid?: string;
  @ApiProperty()
  clientId?: number;
  @ApiProperty()
  name?: string;
  @ApiProperty()
  email?: string;
  @ApiProperty()
  userType?: UserType;
  @ApiProperty()
  status: UserStatus;
  @ApiProperty()
  id?: number;
  @ApiProperty()
  createdAt?: Date;
  @ApiProperty()
  updatedAt?: Date;
}
