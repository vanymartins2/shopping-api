import { MigrationInterface, QueryRunner } from "typeorm";

export class default1659117752411 implements MigrationInterface {
    name = 'default1659117752411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_messages" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "message" varchar NOT NULL, "created_at" datetime NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_messages"("id", "email", "message", "created_at") SELECT "id", "email", "message", "created_at" FROM "messages"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`ALTER TABLE "temporary_messages" RENAME TO "messages"`);
        await queryRunner.query(`CREATE TABLE "temporary_products" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "price" integer NOT NULL, "imgUrl" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_products"("id", "name", "price", "imgUrl") SELECT "id", "name", "price", "imgUrl" FROM "products"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`ALTER TABLE "temporary_products" RENAME TO "products"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME TO "temporary_products"`);
        await queryRunner.query(`CREATE TABLE "products" ("id" varchar PRIMARY KEY NOT NULL, "name" text NOT NULL, "price" integer NOT NULL, "imgUrl" text NOT NULL)`);
        await queryRunner.query(`INSERT INTO "products"("id", "name", "price", "imgUrl") SELECT "id", "name", "price", "imgUrl" FROM "temporary_products"`);
        await queryRunner.query(`DROP TABLE "temporary_products"`);
        await queryRunner.query(`ALTER TABLE "messages" RENAME TO "temporary_messages"`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" varchar PRIMARY KEY NOT NULL, "email" text NOT NULL, "message" text NOT NULL, "created_at" date NOT NULL)`);
        await queryRunner.query(`INSERT INTO "messages"("id", "email", "message", "created_at") SELECT "id", "email", "message", "created_at" FROM "temporary_messages"`);
        await queryRunner.query(`DROP TABLE "temporary_messages"`);
    }

}
