import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { ShowProfileError } from './ShowProfileError';
import { ShowProfileUseCase } from './ShowProfileUseCase';

let showProfileUseCase: ShowProfileUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe('ShowProfileUseCase', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();

    showProfileUseCase = new ShowProfileUseCase(inMemoryUsersRepository);
  });

  it('should be able to show the user profile', async () => {
    const { id } = await inMemoryUsersRepository.create({
      name: 'Ashley Grady',
      email: 'Abraham_Ledner@hotmail.com',
      password: 'fY7pe8GXv3RcMNB',
    });

    const userProfile = await showProfileUseCase.execute({ user_id: id });

    expect(userProfile).toMatchObject({
      id,
      name: 'Ashley Grady',
      email: 'Abraham_Ledner@hotmail.com',
      password: expect.any(String),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  it('should not be able to show the user profile with non existing user', async () => {
    await expect(
      showProfileUseCase.execute({
        user_id: 'non-existing-user-id',
      })
    ).rejects.toEqual(new ShowProfileError());
  });
});
