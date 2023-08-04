import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateClientTables1690543219857 implements MigrationInterface {
    name = 'UpdateClientTables1690543219857'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "password_hash"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "firebase_uid" character varying(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "UQ_40fe3048b17f675b652c1999270" UNIQUE ("firebase_uid")
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")
        `);
        await queryRunner.query(`
            ALTER TABLE "business"
            ALTER COLUMN "type" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "business"
            ALTER COLUMN "logo_url" DROP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "business"
            ALTER COLUMN "logo_url"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "business"
            ALTER COLUMN "type"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "UQ_40fe3048b17f675b652c1999270"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "firebase_uid"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "password_hash" character varying(255) NOT NULL
        `);
    }

}
