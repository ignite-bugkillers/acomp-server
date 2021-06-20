import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addNameToDoctor1624197013372 implements MigrationInterface {
  private column = new TableColumn({
    name: 'name',
    type: 'varchar',
    isNullable: true,
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('doctors', this.column);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('doctors', this.column);
  }
}
