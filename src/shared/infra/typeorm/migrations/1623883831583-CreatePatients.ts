import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePatients1623883831583 implements MigrationInterface {
  private table = new Table({
    name: 'patients',
    columns: [
      {
        name: 'id',
        type: 'varchar',
        isPrimary: true,
      },
      {
        name: 'name',
        type: 'varchar',
      },
      {
        name: 'cpf',
        type: 'varchar',
      },
      {
        name: 'phone',
        type: 'varchar',
        isNullable: true,
      },
      {
        name: 'address',
        type: 'varchar',
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
