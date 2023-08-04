import { ApiProperty } from "@nestjs/swagger";
import { CustomerModel } from "../../../../business/customer/customer.model";
import { Gender } from "../../../../business/enum/gender.enum";

export class CustomerPresenter implements CustomerModel {
  @ApiProperty()
  hasLine?: boolean;
  @ApiProperty()
  email: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  imageUrl?: string;
  @ApiProperty()
  gender?: Gender;
  @ApiProperty()
  birthDate?: Date;
  @ApiProperty()
  location?: string;
  @ApiProperty()
  address?: string;
  @ApiProperty()
  postcode?: string;
  @ApiProperty()
  id?: number;
  @ApiProperty()
  createdAt?: Date;
  @ApiProperty()
  updatedAt?: Date;
  @ApiProperty()
  deletedAt?: Date;
}
