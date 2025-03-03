import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1741013260986 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "users" (
                "id" varchar PRIMARY KEY,
                "email" varchar NOT NULL,
                "password" varchar NOT NULL,
                "company_id" varchar NOT NULL,
                "created_at" timestamp DEFAULT now(),
                "updated_at" timestamp DEFAULT now(),
                CONSTRAINT "fk_user_company" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE
            )`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(
            `DROP TABLE "users"`
        );
    }
}
