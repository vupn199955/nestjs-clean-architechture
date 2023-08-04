import { ApiProperty } from "@nestjs/swagger";
import { BasePresenter } from "../../base.presenter";
import { UserType } from "../../../../business/enum/user-type.enum";
import { UserPresenter } from "../user/user.presenter";
import { BusinessPresenter } from "../business/business.presenter";
import { ClientModel } from "../../../../business/client/client.model";
import { ClientStatus } from "../../../../business/enum/client-status.enum";

export class ClientPresenter implements ClientModel {
  @ApiProperty()
  clientId: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  userType: UserType;
  @ApiProperty()
  status: ClientStatus;
  @ApiProperty()
  id?: number;
  @ApiProperty()
  createdAt?: Date;
  @ApiProperty()
  updatedAt?: Date;
  @ApiProperty()
  uuid: string;
}

export class CreateClientPresenter {
  @ApiProperty({ type: UserPresenter })
  user: UserPresenter;
  @ApiProperty({ type: ClientPresenter })
  client: ClientPresenter;
  @ApiProperty({ type: BusinessPresenter })
  business: BusinessPresenter;
}

export class ClientSignUpPresenter extends BasePresenter {
  @ApiProperty({ type: CreateClientPresenter })
  data: CreateClientPresenter;
}

export class GetClientPresenter extends BasePresenter {
  @ApiProperty({ type: ClientPresenter })
  data: ClientPresenter;
}
