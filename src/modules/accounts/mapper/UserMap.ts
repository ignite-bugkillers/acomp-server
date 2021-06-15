import { User } from '../entities/User';

export class UserMap {
  static toDTO({ id, name, email, created_at, updated_at }: User) {
    return { id, name, email, created_at, updated_at };
  }
}
