import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntityObj } from "./base.entity";
import { ClientModel } from "../../business/client/client.model";
import { BusinessModel } from "../../business/business/business.model";
import { Client } from "./client.entity";
import { UserBusiness } from "./user-business.entity";
import { BusinessStatus } from "../../business/enum/business-status.enum";

@Entity("business")
export class Business extends BaseEntityObj implements BusinessModel {
  @Column()
  @Generated("uuid")
  uuid: string;

  @Column({ name: "name", nullable: false })
  name: string;

  @Column({
    name: "client_id",
    nullable: false,
    type: "int",
    foreignKeyConstraintName: "FK_business_client_id",
  })
  clientId: number;

  @Column({ name: "type", nullable: true })
  type: string;

  @Column({ name: "logo_url", nullable: true })
  logoUrl: string;

  @Column({ nullable: true, default: BusinessStatus.INACTIVE, type: "enum", enum: BusinessStatus })
  status: BusinessStatus;

  @ManyToOne(() => Client, (client) => client.business)
  @JoinColumn({ name: "client_id", referencedColumnName: "id" })
  client?: ClientModel;

  @OneToMany(() => UserBusiness, (userBusiness) => userBusiness.business)
  userBusiness?: UserBusiness[];
}
