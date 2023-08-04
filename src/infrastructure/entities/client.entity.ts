import { Column, Entity, Generated, OneToMany } from "typeorm";
import { BaseEntityObj } from "./base.entity";
import { ClientModel } from "../../business/client/client.model";
import { Business } from "./business.entity";
import { User } from "./user.entity";
import { ClientStatus } from "../../business/enum/client-status.enum";

@Entity("client")
export class Client extends BaseEntityObj implements ClientModel {
  @Column()
  @Generated("uuid")
  uuid: string;

  @Column({ name: "name", nullable: false })
  name: string;

  @Column({ nullable: true, default: ClientStatus.INACTIVE, type: "enum", enum: ClientStatus })
  status: ClientStatus;

  @OneToMany(() => Business, (business) => business.client)
  business?: Business[];

  @OneToMany(() => User, (user) => user.client)
  user?: User[];
}
