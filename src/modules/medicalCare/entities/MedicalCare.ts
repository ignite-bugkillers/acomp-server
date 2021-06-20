import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Doctor } from '../../doctors/entities/Doctor';
import { Patient } from '../../patients/entities/Patient';
import { Procedure } from '../../procedures/entities/Procedure';

@Entity('medical_care')
export class MedicalCare {
  @PrimaryColumn()
  public id: string;

  @Column()
  public patient_id: string;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patient_id' })
  public patient: Patient;

  @Column()
  public doctor_id: string;

  @ManyToOne(() => Doctor)
  @JoinColumn({ name: 'doctor_id' })
  public doctor: Doctor;

  @Column()
  public procedure_id: string;

  @ManyToOne(() => Procedure)
  @JoinColumn({ name: 'procedure_id' })
  public procedure: Procedure;

  @Column('date')
  public date: Date;

  @Column()
  public description: string;

  @CreateDateColumn()
  public created_at: string;

  @UpdateDateColumn()
  public updated_at: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
