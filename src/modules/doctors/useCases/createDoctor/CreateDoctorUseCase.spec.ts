import { InMemoryUsersRepository } from '../../../accounts/repositories/in-memory/InMemoryUsersRepository';
import { InMemoryDoctorsRepository } from '../../repositories/in-memory/InMemoryDoctorsRepository';
import { CreateDoctorError } from './CreateDoctorError';
import { CreateDoctorUserCase } from './CreateDoctorUseCase';

let createDoctorUseCase: CreateDoctorUserCase;
let inMemoryDoctosRepository: InMemoryDoctorsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe('CreateDoctorUseCase', () => {
  beforeEach(() => {
    inMemoryDoctosRepository = new InMemoryDoctorsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();

    createDoctorUseCase = new CreateDoctorUserCase(
      inMemoryDoctosRepository,
      inMemoryUsersRepository
    );
  });

  it('should be able to create new doctor', async () => {
    const { id: user_id } = await inMemoryUsersRepository.create({
      name: 'Mr. Erik Mayert',
      email: 'Darwin96@yahoo.com',
      password: 'saGQ07qiu1KSuQW',
    });

    const doctor = await createDoctorUseCase.execute({
      name: 'Mr. Erik Mayert',
      phone: '(832) 398-4578 x248',
      crm: '64650',
      user_id,
    });

    expect(doctor).toMatchObject({
      id: expect.any(String),
      name: 'Mr. Erik Mayert',
      phone: '(832) 398-4578 x248',
      crm: '64650',
      user_id,
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  it('should not be able to create new doctor with same crm from another', async () => {
    const { id: user_id } = await inMemoryUsersRepository.create({
      name: 'Mr. Erik Mayert',
      email: 'Darwin96@yahoo.com',
      password: 'saGQ07qiu1KSuQW',
    });

    await inMemoryDoctosRepository.create({
      name: 'Mr. Erik Mayert',
      phone: '(832) 398-4578 x248',
      crm: '64650',
      user_id,
    });

    await expect(
      createDoctorUseCase.execute({
        name: 'Diana Pouros',
        crm: '64650',
        phone: '574-550-1339',
        user_id,
      })
    ).rejects.toEqual(new CreateDoctorError.DoctorAlreadyExists());
  });

  it('should not be able to create new doctor with non existing user', async () => {
    await expect(
      createDoctorUseCase.execute({
        name: 'Diana Pouros',
        crm: '64650',
        phone: '574-550-1339',
        user_id: 'non-existing-user-id',
      })
    ).rejects.toEqual(new CreateDoctorError.UserNotExists());
  });
});
