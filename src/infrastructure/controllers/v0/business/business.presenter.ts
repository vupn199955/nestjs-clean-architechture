import { ApiProperty } from "@nestjs/swagger";
import { BusinessModel } from "../../../../business/business/business.model";
import { BusinessStatus } from "../../../../business/enum/business-status.enum";
import { BasePresenter } from "../../base.presenter";

export class BusinessPresenter implements BusinessModel {
  @ApiProperty()
  uuid?: string;
  @ApiProperty()
  clientId?: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  type?: string;
  @ApiProperty()
  logoUrl?: string;
  @ApiProperty()
  status?: BusinessStatus;
  @ApiProperty()
  id?: number;
  @ApiProperty()
  createdAt?: Date;
  @ApiProperty()
  updatedAt?: Date;
}

export class GetBusinessPresenter extends BasePresenter {
  @ApiProperty({ type: BusinessPresenter, isArray: true })
  data: BusinessPresenter[];
}
