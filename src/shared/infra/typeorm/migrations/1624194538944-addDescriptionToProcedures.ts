import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addDescriptionToProcedures1624194538944
  implements MigrationInterface
{
  private column = new TableColumn({
    name: 'description',
    type: 'text',
    isNullable: true,
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('procedures', this.column);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('procedures', this.column);
  }
}
