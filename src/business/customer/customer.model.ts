import { BaseModel } from "../core/base.model";
import { Gender } from "../enum/gender.enum";

export interface CustomerModel extends BaseModel {
  uuid?: string;
  hasLine?: boolean;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  gender?: Gender;
  birthDate?: Date;
  location?: string;
  address?: string;
  postcode?: string;
}
