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

import { User } from '../../../modules/accounts/entities/User';

@Entity('doctors')
export class Doctor {
  @PrimaryColumn()
  public id: string;

  @Column()
  public name: string;

  @Column()
  public crm: string;

  @Column()
  public user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  public user: User;

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
