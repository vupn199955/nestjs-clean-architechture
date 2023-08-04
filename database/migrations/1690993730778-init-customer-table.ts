import { MigrationInterface, QueryRunner } from "typeorm";

export class InitCustomerTable1690993730778 implements MigrationInterface {
    name = 'InitCustomerTable1690993730778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."customer_gender_enum" AS ENUM('male', 'female')
        `);
        await queryRunner.query(`
            CREATE TABLE "customer" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "has_line" boolean DEFAULT false,
                "email" character varying(100),
                "first_name" character varying(100),
                "last_name" character varying(100),
                "image_url" character varying(400),
                "gender" "public"."customer_gender_enum",
                "birth_date" date,
                "location" character varying(100),
                "address" character varying(100),
                "postcode" character varying(20),
                CONSTRAINT "UQ_fdb2f3ad8115da4c7718109a6eb" UNIQUE ("email"),
                CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "customer"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."customer_gender_enum"
        `);
    }

}
