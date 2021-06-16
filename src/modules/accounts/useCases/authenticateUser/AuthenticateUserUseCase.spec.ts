import { InMemoryHashProvider } from '../../../../shared/container/providers/HashProvider/in-memory/InMemoryHashProvider';
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { IncorrectEmailOrPasswordError } from './IncorrectEmailOrPasswordError';

let authenticateUserUseCase: AuthenticateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryHashProvider: InMemoryHashProvider;

describe('AuthenticateUserUseCase', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryHashProvider = new InMemoryHashProvider();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
      inMemoryHashProvider
    );
  });

  it('should be able to authenticate user', async () => {
    await inMemoryUsersRepository.create({
      name: 'Helen Maggio',
      email: 'Imani.Leffler@gmail.com',
      password: 'TsHXgP0wh8YUi7P',
    });

    const response = await authenticateUserUseCase.execute({
      email: 'Imani.Leffler@gmail.com',
      password: 'TsHXgP0wh8YUi7P',
    });

    expect(response).toMatchObject({
      user: {
        id: expect.any(String),
        name: 'Helen Maggio',
        email: 'Imani.Leffler@gmail.com',
      },
      token: expect.any(String),
    });
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'Adrien65@hotmail.com',
        password: 'B9XIDRo8E1zDF1P',
      })
    ).rejects.toEqual(new IncorrectEmailOrPasswordError());
  });

  it('should not be able to authenticate with wrong password', async () => {
    await inMemoryUsersRepository.create({
      name: 'Mindy Rohan',
      email: 'Leonie25@hotmail.com',
      password: 'BpRg9jLOpv8gvyv',
    });

    await expect(
      authenticateUserUseCase.execute({
        email: 'Leonie25@hotmail.com',
        password: 'wrong-password',
      })
    ).rejects.toEqual(new IncorrectEmailOrPasswordError());
  });
});
