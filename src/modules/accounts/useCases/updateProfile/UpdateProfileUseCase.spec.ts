import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { UpdateProfileError } from './UpdateProfileError';
import { UpdateProfileUseCase } from './UpdateProfileUseCase';

let updateProfileUseCase: UpdateProfileUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe('UpdateProfileUseCase', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();

    updateProfileUseCase = new UpdateProfileUseCase(inMemoryUsersRepository);
  });

  it('should be able to update the user profile', async () => {
    const { id } = await inMemoryUsersRepository.create({
      name: 'Andy Hartmann',
      email: 'Reese_Koepp84@gmail.com',
      password: 'iUY0TZNVzS1FA7H',
    });

    const userProfile = await updateProfileUseCase.execute({
      user_id: id,
      name: 'Muriel Mayer',
      email: 'Pearl_Davis@gmail.com',
    });

    expect(userProfile).toMatchObject({
      id,
      name: 'Muriel Mayer',
      email: 'Pearl_Davis@gmail.com',
      password: expect.any(String),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  it('should not be able to update the user profile with non existing user', async () => {
    await expect(
      updateProfileUseCase.execute({
        user_id: 'non-existing-user-id',
        email: 'Hailie67@yahoo.com',
        name: 'Carole Hoeger',
      })
    ).rejects.toEqual(new UpdateProfileError.UserNotExists());
  });

  it('should not be able to update the user profile with same email from another', async () => {
    const { id: user_id } = await inMemoryUsersRepository.create({
      name: 'Muriel Mayer',
      email: 'Pearl_Davis@gmail.com',
      password: '_b8UWyRBu3mAt4X',
    });

    await inMemoryUsersRepository.create({
      name: 'Andy Hartmann',
      email: 'Reese_Koepp84@gmail.com',
      password: 'iUY0TZNVzS1FA7H',
    });

    await expect(
      updateProfileUseCase.execute({
        user_id,
        name: 'Muriel Mayer',
        email: 'Reese_Koepp84@gmail.com',
      })
    ).rejects.toEqual(new UpdateProfileError.EmailInUse());
  });
});
