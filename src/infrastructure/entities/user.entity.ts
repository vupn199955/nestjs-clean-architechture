import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntityObj } from "./base.entity";
import { ClientModel } from "../../business/client/client.model";
import { UserModel } from "../../business/user/user.model";
import { Client } from "./client.entity";
import { UserBusiness } from "./user-business.entity";
import { UserStatus } from "../../business/enum/user-status.enum";
import { UserType } from "../../business/enum/user-type.enum";

@Entity("user")
export class User extends BaseEntityObj implements UserModel {
  @Column()
  @Generated("uuid")
  uuid: string;

  @Column({ name: "name", nullable: false, type: "varchar", length: 255 })
  name: string;

  @Column({
    name: "client_id",
    nullable: false,
    type: "int",
    foreignKeyConstraintName: "FK_user_client_id",
  })
  clientId: number;

  @Column({ name: "email", nullable: false, type: "varchar", length: 255, unique: true })
  email: string;

  @Column({ name: "user_type", nullable: false, type: "enum", enum: UserType })
  userType: UserType;

  @Column({ nullable: true, default: UserStatus.INACTIVE, type: "enum", enum: UserStatus })
  status: UserStatus;

  @Column({
    name: "firebase_uid",
    nullable: false,
    type: "varchar",
    length: 255,
    unique: true,
    select: false,
  })
  firebaseUid: string;

  @ManyToOne(() => Client, (client) => client.business)
  @JoinColumn({ name: "client_id", referencedColumnName: "id" })
  client?: ClientModel;

  @OneToMany(() => UserBusiness, (userBusiness) => userBusiness.user)
  userBusiness?: UserBusiness[];
}
