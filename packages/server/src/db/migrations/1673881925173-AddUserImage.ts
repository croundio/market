import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserImage1673881925173 implements MigrationInterface {
    name = 'AddUserImage1673881925173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "image"`);
    }

}
