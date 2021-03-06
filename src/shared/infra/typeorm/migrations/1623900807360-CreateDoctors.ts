import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateDoctors1623900807360 implements MigrationInterface {
  private table = new Table({
    name: 'doctors',
    columns: [
      {
        name: 'id',
        type: 'varchar',
        isPrimary: true,
      },
      {
        name: 'phone',
        type: 'varchar',
      },
      {
        name: 'crm',
        type: 'varchar',
        isUnique: true,
      },
      {
        name: 'user_id',
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
