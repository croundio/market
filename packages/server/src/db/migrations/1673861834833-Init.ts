import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1673861834833 implements MigrationInterface {
    name = 'Init1673861834833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."offer_status_enum" AS ENUM('ACTIVE', 'WAITING', 'DEACTIVATE', 'CANCELED')`);
        await queryRunner.query(`CREATE TABLE "offer" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "categoryId" integer NOT NULL, "price" integer NOT NULL, "isUsed" boolean NOT NULL, "images" text, "status" "public"."offer_status_enum" NOT NULL DEFAULT 'WAITING', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "ownerId" integer NOT NULL, CONSTRAINT "PK_57c6ae1abe49201919ef68de900" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "googleId" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "favorites" ("userId" integer NOT NULL, "offerId" integer NOT NULL, CONSTRAINT "PK_053a1a57a868cb4072640f399cf" PRIMARY KEY ("userId", "offerId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e747534006c6e3c2f09939da60" ON "favorites" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_36f845a98947ed772176982bf2" ON "favorites" ("offerId") `);
        await queryRunner.query(`ALTER TABLE "offer" ADD CONSTRAINT "FK_f458a1bb3bbe09b95afa896ecea" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "offer" ADD CONSTRAINT "FK_c8622606fb86628c17b9762157b" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "FK_e747534006c6e3c2f09939da60f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "FK_36f845a98947ed772176982bf2e" FOREIGN KEY ("offerId") REFERENCES "offer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "FK_36f845a98947ed772176982bf2e"`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "FK_e747534006c6e3c2f09939da60f"`);
        await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_c8622606fb86628c17b9762157b"`);
        await queryRunner.query(`ALTER TABLE "offer" DROP CONSTRAINT "FK_f458a1bb3bbe09b95afa896ecea"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_36f845a98947ed772176982bf2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e747534006c6e3c2f09939da60"`);
        await queryRunner.query(`DROP TABLE "favorites"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "offer"`);
        await queryRunner.query(`DROP TYPE "public"."offer_status_enum"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
