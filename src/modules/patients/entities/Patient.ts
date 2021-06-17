import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('patients')
export class Patient {
  @PrimaryColumn()
  public id: string;

  @Column()
  public name: string;

  @Column()
  public cpf: string;

  @Column()
  public phone?: string;

  @Column()
  public address: string;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
