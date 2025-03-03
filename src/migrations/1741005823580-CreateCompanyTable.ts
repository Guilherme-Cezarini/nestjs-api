import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCompanyTable1741005823580 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "companies" (
                "id" varchar PRIMARY KEY,
                "document" varchar NOT NULL,
                "name" varchar NOT NULL,
                "created_at" timestamp DEFAULT now(),
                "updated_at" timestamp DEFAULT now()
            )`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(
            `DROP TABLE "companies"`
        );
    }

}
