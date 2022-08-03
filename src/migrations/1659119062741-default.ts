import { MigrationInterface, QueryRunner } from "typeorm";

export class default1659119062741 implements MigrationInterface {
    name = 'default1659119062741'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_messages" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "message" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_messages"("id", "email", "message") SELECT "id", "email", "message" FROM "messages"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`ALTER TABLE "temporary_messages" RENAME TO "messages"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" RENAME TO "temporary_messages"`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "message" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "messages"("id", "email", "message") SELECT "id", "email", "message" FROM "temporary_messages"`);
        await queryRunner.query(`DROP TABLE "temporary_messages"`);
    }

}
