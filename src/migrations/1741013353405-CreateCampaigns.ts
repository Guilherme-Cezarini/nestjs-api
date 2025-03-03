import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCampaigns1741013353405 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "campaigns" (
                "id" varchar PRIMARY KEY,
                "name" varchar NOT NULL,
                "company_id" varchar NOT NULL,
                "created_at" timestamp DEFAULT now(),
                "updated_at" timestamp DEFAULT now(),
                CONSTRAINT "fk_campaign_company" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE
            )`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TABLE "campaigns"`
        );
    }


}
