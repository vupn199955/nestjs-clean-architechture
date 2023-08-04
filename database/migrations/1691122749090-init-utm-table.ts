import { MigrationInterface, QueryRunner } from "typeorm";

export class InitUtmTable1691122749090 implements MigrationInterface {
    name = 'InitUtmTable1691122749090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "utm" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "name" character varying(100) NOT NULL,
                "channel" character varying(100) NOT NULL,
                "type" character varying(100) NOT NULL,
                "destination_url" character varying(255) NOT NULL,
                "shortened_url" character varying(255) NOT NULL,
                "shortened_url_qr" character varying(255),
                CONSTRAINT "PK_f1570afd845c538ed0203b8f9ad" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "utm"
        `);
    }

}
