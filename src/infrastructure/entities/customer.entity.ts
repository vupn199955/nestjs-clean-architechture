import { Column, Entity, Generated } from "typeorm";
import { CustomerModel } from "../../business/customer/customer.model";
import { BaseEntityObj } from "./base.entity";
import { Gender } from "../../business/enum/gender.enum";

@Entity("customer")
export class Customer extends BaseEntityObj implements CustomerModel {
  @Column()
  @Generated("uuid")
  uuid: string;

  @Column({ name: "has_line", nullable: true, default: false })
  hasLine: boolean;

  @Column({ name: "email", nullable: true, unique: true, length: 100, type: "varchar" })
  email: string;

  @Column({ name: "first_name", nullable: true, length: 100, type: "varchar" })
  firstName: string;

  @Column({ name: "last_name", nullable: true, length: 100, type: "varchar" })
  lastName: string;

  @Column({ name: "image_url", nullable: true, length: 400, type: "varchar" })
  imageUrl?: string;

  @Column({ type: "enum", enum: Gender, nullable: true })
  gender?: Gender;

  @Column({ name: "birth_date", nullable: true, type: "date" })
  birthDate?: Date;

  @Column({ nullable: true, length: 100, type: "varchar" })
  location?: string;

  @Column({ nullable: true, length: 100, type: "varchar" })
  address?: string;

  @Column({ nullable: true, length: 20, type: "varchar" })
  postcode?: string;
}
