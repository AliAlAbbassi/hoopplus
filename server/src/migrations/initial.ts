import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initial1597626060117 implements MigrationInterface {
  name = 'Initial1597626060117'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "human" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "profilePhotoUrl" character varying, "bio" character varying, "major" character varying, "firstName" character varying, "lastName" character varying, "specialty" character varying, "phonenumber" character varying, "discordusername" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "human"`)
  }
}
