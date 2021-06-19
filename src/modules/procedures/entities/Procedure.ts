import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('procedures')
export class Procedure {
  @PrimaryColumn()
  public id: string;

  @Column()
  public type: string;

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
