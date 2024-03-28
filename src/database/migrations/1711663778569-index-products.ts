import { MigrationInterface, QueryRunner } from "typeorm";

export class IndexProducts1711663778569 implements MigrationInterface {
    name = 'IndexProducts1711663778569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_0decfc62b4e4834e2024a9d9c4" ON "product" ("price", "stock") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_0decfc62b4e4834e2024a9d9c4"`);
    }

}
