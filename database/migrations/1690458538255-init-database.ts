import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1690458538255 implements MigrationInterface {
    name = 'InitDatabase1690458538255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user_business" (
                "id" SERIAL NOT NULL,
                "user_id" integer NOT NULL,
                "business_id" integer NOT NULL,
                CONSTRAINT "PK_5a4bd96d9a519d4d20a21231b9f" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."user_user_type_enum" AS ENUM('owner', 'staff', 'admin')
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."user_status_enum" AS ENUM('active', 'inactive')
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(255) NOT NULL,
                "client_id" integer NOT NULL,
                "email" character varying(255) NOT NULL,
                "password_hash" character varying(255) NOT NULL,
                "user_type" "public"."user_user_type_enum" NOT NULL,
                "status" "public"."user_status_enum" DEFAULT 'inactive',
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."client_status_enum" AS ENUM('active', 'inactive')
        `);
        await queryRunner.query(`
            CREATE TABLE "client" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "status" "public"."client_status_enum" DEFAULT 'inactive',
                CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."business_status_enum" AS ENUM('active', 'inactive')
        `);
        await queryRunner.query(`
            CREATE TABLE "business" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "client_id" integer NOT NULL,
                "type" character varying NOT NULL,
                "logo_url" character varying NOT NULL,
                "status" "public"."business_status_enum" DEFAULT 'inactive',
                CONSTRAINT "PK_0bd850da8dafab992e2e9b058e5" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "user_business"
            ADD CONSTRAINT "FK_3355213a29545a4cc79a9197c5d" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user_business"
            ADD CONSTRAINT "FK_a9cd0fb7516873fce7648b3612c" FOREIGN KEY ("business_id") REFERENCES "business"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_fed09e6f9c08a5031ba1e3e9701" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "business"
            ADD CONSTRAINT "FK_3f9f0c8f6305a88a042549f9a8d" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "business" DROP CONSTRAINT "FK_3f9f0c8f6305a88a042549f9a8d"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_fed09e6f9c08a5031ba1e3e9701"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_business" DROP CONSTRAINT "FK_a9cd0fb7516873fce7648b3612c"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_business" DROP CONSTRAINT "FK_3355213a29545a4cc79a9197c5d"
        `);
        await queryRunner.query(`
            DROP TABLE "business"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."business_status_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "client"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."client_status_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."user_status_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."user_user_type_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "user_business"
        `);
    }

}
