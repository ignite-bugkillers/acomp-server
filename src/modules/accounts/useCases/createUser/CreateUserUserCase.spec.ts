import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { CreateUserError } from './CreateUserError';
import { CreateUserUseCase } from './CreateUserUseCase';

let createUserUserCase: CreateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe('CreateUserUserCase', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();

    createUserUserCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it('should be able to create a new user', async () => {
    const user = await createUserUserCase.execute({
      name: 'Ashley Grady',
      email: 'Abraham_Ledner@hotmail.com',
      password: 'fY7pe8GXv3RcMNB',
    });

    expect(user).toMatchObject({
      id: expect.any(String),
      name: 'Ashley Grady',
      email: 'Abraham_Ledner@hotmail.com',
      password: 'fY7pe8GXv3RcMNB',
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUserUserCase.execute({
      name: 'Ms. Arnold Rau',
      email: 'Clay.Torp79@gmail.com',
      password: 'i4pL8Ix5j7ynsh4',
    });

    await expect(
      createUserUserCase.execute({
        name: 'Jan Becker',
        email: 'Clay.Torp79@gmail.com',
        password: 'Byg0eOiesTwKPfj',
      })
    ).rejects.toEqual(new CreateUserError());
  });
});
