import { Column, Entity } from "typeorm";
import { UtmModel } from "../../business/utm/utm.model";
import { BaseEntityObj } from "./base.entity";

@Entity("utm")
export class Utm extends BaseEntityObj implements UtmModel {
  @Column({ name: "name", nullable: false, type: "varchar", length: 100 })
  name: string;

  @Column({ name: "channel", nullable: false, type: "varchar", length: 100 })
  channel: string;

  @Column({ name: "type", nullable: false, type: "varchar", length: 100 })
  type: string;

  @Column({ name: "destination_url", nullable: false, type: "varchar", length: 255 })
  destinationUrl: string;

  @Column({ name: "shortened_url", nullable: false, type: "varchar", length: 255 })
  shortenedUrl: string;

  @Column({ name: "shortened_url_qr", nullable: true, type: "varchar", length: 255 })
  shortenedUrlQr?: string;
}
