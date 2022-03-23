import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1643894638933 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true
          },
          {
            name: "driver_license",
            type: "varchar",
          },
          {
            name: "avatar",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "isAdmin",
            type: "boolean",
            default: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default:"now()",
          }
        ]       
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      queryRunner.dropTable("Users")
    }

}
