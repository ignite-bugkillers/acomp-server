import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMedicalCare1624193276480 implements MigrationInterface {
  private table = new Table({
    name: 'medical_care',
    columns: [
      {
        name: 'id',
        type: 'varchar',
        isPrimary: true,
      },
      {
        name: 'patient_id',
        type: 'varchar',
      },
      {
        name: 'doctor_id',
        type: 'varchar',
      },
      {
        name: 'procedure_id',
        type: 'varchar',
      },
      {
        name: 'date',
        type: 'timestamp without time zone',
      },
      {
        name: 'description',
        type: 'text',
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
    foreignKeys: [
      {
        name: 'FKMedicalCarePatient',
        referencedTableName: 'patients',
        referencedColumnNames: ['id'],
        columnNames: ['patient_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      {
        name: 'FKMedicalCareDoctor',
        referencedTableName: 'doctors',
        referencedColumnNames: ['id'],
        columnNames: ['doctor_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      {
        name: 'FKMedicalCareProcedure',
        referencedTableName: 'procedures',
        referencedColumnNames: ['id'],
        columnNames: ['procedure_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
