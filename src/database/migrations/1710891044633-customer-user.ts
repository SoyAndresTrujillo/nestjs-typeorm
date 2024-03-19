import { MigrationInterface, QueryRunner } from "typeorm";

export class CustomerUser1710891044633 implements MigrationInterface {
    name = 'CustomerUser1710891044633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer" ("id" integer NOT NULL, "phone" character varying(255) NOT NULL, "nameFirst" character varying(255) NOT NULL, "nameLast" character varying(255) NOT NULL, "dateCreateat" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateUpdateat" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "role" character varying(255) NOT NULL, "customerId" integer, "nameFirst" character varying(255) NOT NULL, "nameLast" character varying(255) NOT NULL, "dateCreateat" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "dateUpdateat" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "REL_6c687a8fa35b0ae35ce766b56c" UNIQUE ("customerId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "customer"`);
    }

}
