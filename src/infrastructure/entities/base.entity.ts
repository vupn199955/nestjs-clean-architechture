import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class BaseEntityObj extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  @PrimaryColumn()
  id?: number;

  @CreateDateColumn({
    name: "created_at",
  })
  createdAt?: Date;

  @UpdateDateColumn({
    name: "updated_at",
  })
  updatedAt?: Date;

  @DeleteDateColumn({
    name: "deleted_at",
    select: false,
  })
  deletedAt?: Date;
}
