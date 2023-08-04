import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserBusinessModel } from "../../business/user-business/user-business.model";
import { User } from "./user.entity";
import { Business } from "./business.entity";

@Entity("user_business")
export class UserBusiness implements UserBusinessModel {
  @PrimaryGeneratedColumn("increment")
  @PrimaryColumn()
  id: number;

  @Column({
    name: "user_id",
    nullable: false,
    type: "int",
    foreignKeyConstraintName: "FK_user_business_user_id",
  })
  userId: number;

  @Column({
    name: "business_id",
    nullable: false,
    type: "int",
    foreignKeyConstraintName: "FK_user_business_business_id",
  })
  businessId: number;

  @ManyToOne(() => User, (user) => user.userBusiness)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user?: User;

  @ManyToOne(() => Business, (business) => business.userBusiness)
  @JoinColumn({ name: "business_id", referencedColumnName: "id" })
  business?: Business;
}
