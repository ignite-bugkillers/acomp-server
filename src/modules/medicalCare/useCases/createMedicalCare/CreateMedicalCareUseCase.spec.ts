import { InMemoryUsersRepository } from '../../../accounts/repositories/in-memory/InMemoryUsersRepository';
import { InMemoryDoctorsRepository } from '../../../doctors/repositories/in-memory/InMemoryDoctorsRepository';
import { InMemoryPatientsRepository } from '../../../patients/repositories/in-memory/InMemoryPatientsRepository';
import { InMemoryProceduresRepository } from '../../../procedures/repositories/in-memory/InMemoryProceduresRepository';
import { InMemoryMedicalCareRepository } from '../../repositories/in-memory/InMemoryMedicalCareRepository';
import { CreateMedicalCareError } from './CreateMedicalCareError';
import { CreateMedicalCareUseCase } from './CreateMedicalCareUseCase';

let createMedicalCareUseCase: CreateMedicalCareUseCase;
let inMemoryMedicalCareRepository: InMemoryMedicalCareRepository;
let inMemoryDoctorsRepository: InMemoryDoctorsRepository;
let inMemoryPatientsRepository: InMemoryPatientsRepository;
let inMemoryProceduresRepository: InMemoryProceduresRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe('CreateMedicalCareUseCase', () => {
  beforeEach(() => {
    inMemoryMedicalCareRepository = new InMemoryMedicalCareRepository();
    inMemoryDoctorsRepository = new InMemoryDoctorsRepository();
    inMemoryPatientsRepository = new InMemoryPatientsRepository();
    inMemoryProceduresRepository = new InMemoryProceduresRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();

    createMedicalCareUseCase = new CreateMedicalCareUseCase(
      inMemoryMedicalCareRepository,
      inMemoryDoctorsRepository,
      inMemoryPatientsRepository,
      inMemoryProceduresRepository
    );
  });

  it('should be able to create a new medical care', async () => {
    const { id: user_id } = await inMemoryUsersRepository.create({
      name: 'Mr. Erik Mayert',
      email: 'Darwin96@yahoo.com',
      password: 'saGQ07qiu1KSuQW',
    });

    const { id: doctor_id } = await inMemoryDoctorsRepository.create({
      name: 'Mr. Erik Mayert',
      phone: '(832) 398-4578 x248',
      crm: '64650',
      user_id,
    });

    const { id: patient_id } = await inMemoryPatientsRepository.create({
      name: 'Percy Baumbach',
      address: '30730 Jacklyn Ways',
      birth_date: new Date(
        'Thu Nov 19 2020 02:19:22 GMT-0300 (Brasilia Standard Time)'
      ),
      cpf: '63477634778',
    });

    const { id: procedure_id } = await inMemoryProceduresRepository.create({
      type: 'sunt itaque quidem',
      description:
        'Culpa dolorum asperiores consectetur ut sunt enim odio. Consequatur quia id voluptatum vero aut doloremque. Velit neque dolor quas. Provident omnis dolore quidem. Repellat magni consequatur. Id maxime ipsam aut officiis officiis ducimus omnis non sunt.',
    });

    const medicalCare = await createMedicalCareUseCase.execute({
      doctor_id,
      patient_id,
      procedure_id,
      date: new Date(
        'Wed Mar 23 2022 03:40:02 GMT-0300 (Brasilia Standard Time)'
      ),
      description:
        'Atque tempore labore ullam mollitia voluptatum consequatur.',
    });

    expect(medicalCare).toMatchObject({
      id: expect.any(String),
      doctor_id,
      patient_id,
      procedure_id,
      date: new Date(
        'Wed Mar 23 2022 03:40:02 GMT-0300 (Brasilia Standard Time)'
      ),
      description:
        'Atque tempore labore ullam mollitia voluptatum consequatur.',
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  it('should not be able to create a new medical care with non existing doctor', async () => {
    const { id: patient_id } = await inMemoryPatientsRepository.create({
      name: 'Percy Baumbach',
      address: '30730 Jacklyn Ways',
      birth_date: new Date(
        'Thu Nov 19 2020 02:19:22 GMT-0300 (Brasilia Standard Time)'
      ),
      cpf: '63477634778',
    });

    const { id: procedure_id } = await inMemoryProceduresRepository.create({
      type: 'sunt itaque quidem',
      description:
        'Culpa dolorum asperiores consectetur ut sunt enim odio. Consequatur quia id voluptatum vero aut doloremque. Velit neque dolor quas. Provident omnis dolore quidem. Repellat magni consequatur. Id maxime ipsam aut officiis officiis ducimus omnis non sunt.',
    });

    await expect(
      createMedicalCareUseCase.execute({
        doctor_id: 'non-existing-doctor-id',
        patient_id,
        procedure_id,
        date: new Date(
          'Wed Mar 23 2022 03:40:02 GMT-0300 (Brasilia Standard Time)'
        ),
        description:
          'Atque tempore labore ullam mollitia voluptatum consequatur.',
      })
    ).rejects.toEqual(new CreateMedicalCareError.DoctorNotExists());
  });

  it('should not be able to create a new medical care with non existing patient', async () => {
    const { id: user_id } = await inMemoryUsersRepository.create({
      name: 'Mr. Erik Mayert',
      email: 'Darwin96@yahoo.com',
      password: 'saGQ07qiu1KSuQW',
    });

    const { id: doctor_id } = await inMemoryDoctorsRepository.create({
      name: 'Mr. Erik Mayert',
      phone: '(832) 398-4578 x248',
      crm: '64650',
      user_id,
    });

    const { id: procedure_id } = await inMemoryProceduresRepository.create({
      type: 'sunt itaque quidem',
      description:
        'Culpa dolorum asperiores consectetur ut sunt enim odio. Consequatur quia id voluptatum vero aut doloremque. Velit neque dolor quas. Provident omnis dolore quidem. Repellat magni consequatur. Id maxime ipsam aut officiis officiis ducimus omnis non sunt.',
    });

    await expect(
      createMedicalCareUseCase.execute({
        doctor_id,
        patient_id: 'non-existing-patient-id',
        procedure_id,
        date: new Date(
          'Wed Mar 23 2022 03:40:02 GMT-0300 (Brasilia Standard Time)'
        ),
        description:
          'Atque tempore labore ullam mollitia voluptatum consequatur.',
      })
    ).rejects.toEqual(new CreateMedicalCareError.PatientNotExists());
  });

  it('should not be able to create a new medical care with non existing procedure', async () => {
    const { id: user_id } = await inMemoryUsersRepository.create({
      name: 'Mr. Erik Mayert',
      email: 'Darwin96@yahoo.com',
      password: 'saGQ07qiu1KSuQW',
    });

    const { id: doctor_id } = await inMemoryDoctorsRepository.create({
      name: 'Mr. Erik Mayert',
      phone: '(832) 398-4578 x248',
      crm: '64650',
      user_id,
    });

    const { id: patient_id } = await inMemoryPatientsRepository.create({
      name: 'Percy Baumbach',
      address: '30730 Jacklyn Ways',
      birth_date: new Date(
        'Thu Nov 19 2020 02:19:22 GMT-0300 (Brasilia Standard Time)'
      ),
      cpf: '63477634778',
    });

    await expect(
      createMedicalCareUseCase.execute({
        doctor_id,
        patient_id,
        procedure_id: 'non-existing-procedure-id',
        date: new Date(
          'Wed Mar 23 2022 03:40:02 GMT-0300 (Brasilia Standard Time)'
        ),
        description:
          'Atque tempore labore ullam mollitia voluptatum consequatur.',
      })
    ).rejects.toEqual(new CreateMedicalCareError.ProcedureNotExists());
  });
});
