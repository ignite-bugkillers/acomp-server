import { InMemoryDoctorsRepository } from '../../repositories/in-memory/InMemoryDoctorsRepository';
import { UpdateDoctorError } from './UpdateDoctorError';
import { UpdateDoctorUserCase } from './UpdateDoctorUseCase';

let updateDoctorUseCase: UpdateDoctorUserCase;
let inMemoryDoctorsRepository: InMemoryDoctorsRepository;

describe('UpdateDoctorUseCase', () => {
  beforeEach(() => {
    inMemoryDoctorsRepository = new InMemoryDoctorsRepository();

    updateDoctorUseCase = new UpdateDoctorUserCase(inMemoryDoctorsRepository);
  });

  it('should be able to update doctor', async () => {
    const { id } = await inMemoryDoctorsRepository.create({
      name: 'Mr. Erik Mayert',
      phone: '(832) 398-4578 x248',
      crm: '64650',
      user_id: '1',
    });

    const doctor = await updateDoctorUseCase.execute({
      id,
      crm: '14587',
      name: 'Dr. Bruce Beatty',
      phone: '466.421.3358 x2549',
    });

    expect(doctor).toMatchObject({
      id,
      crm: '14587',
      name: 'Dr. Bruce Beatty',
      phone: '466.421.3358 x2549',
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  it('should not be able to update doctor with same crm from another', async () => {
    const { id } = await inMemoryDoctorsRepository.create({
      name: 'Mr. Erik Mayert',
      phone: '(832) 398-4578 x248',
      crm: '64650',
      user_id: '1',
    });

    await inMemoryDoctorsRepository.create({
      crm: '14587',
      name: 'Dr. Bruce Beatty',
      phone: '466.421.3358 x2549',
      user_id: '2',
    });

    await expect(
      updateDoctorUseCase.execute({
        id,
        name: 'Archie Wintheiser',
        phone: '(941) 762-0987 x78251',
        crm: '14587',
      })
    ).rejects.toEqual(new UpdateDoctorError.CrmInUse());
  });

  it('should not be able to update doctor with non existing doctor', async () => {
    await expect(
      updateDoctorUseCase.execute({
        id: 'non-existing-doctor-id',
        name: 'Archie Wintheiser',
        phone: '(941) 762-0987 x78251',
        crm: '14587',
      })
    ).rejects.toEqual(new UpdateDoctorError.DoctorNotExists());
  });
});
