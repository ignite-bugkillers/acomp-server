import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddBirthDateFieldToPatients1623974191456
  implements MigrationInterface
{
  private column = new TableColumn({
    name: 'birth_date',
    type: 'timestamp without time zone',
    isNullable: true,
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('patients', this.column);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('patients', this.column);
  }
}
