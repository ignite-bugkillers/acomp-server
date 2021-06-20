import { InMemoryDoctorsRepository } from '../../repositories/in-memory/InMemoryDoctorsRepository';
import { ShowDoctorError } from './ShowDoctorError';
import { ShowDoctorUseCase } from './ShowDoctorUserCase';

let showDoctorUseCase: ShowDoctorUseCase;
let inMemoryDoctorsRepository: InMemoryDoctorsRepository;

describe('ShowDoctorUseCase', () => {
  beforeEach(() => {
    inMemoryDoctorsRepository = new InMemoryDoctorsRepository();

    showDoctorUseCase = new ShowDoctorUseCase(inMemoryDoctorsRepository);
  });

  it('should be able to show doctor', async () => {
    const { id } = await inMemoryDoctorsRepository.create({
      name: 'Mr. Erik Mayert',
      phone: '(832) 398-4578 x248',
      crm: '64650',
      user_id: '1',
    });

    const doctor = await showDoctorUseCase.execute({ doctor_id: id });

    expect(doctor).toMatchObject({
      id,
      name: 'Mr. Erik Mayert',
      phone: '(832) 398-4578 x248',
      crm: '64650',
      user_id: '1',
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  it('should not be able to show doctor with non existing doctor', async () => {
    await expect(
      showDoctorUseCase.execute({ doctor_id: 'non-existing-doctor-id' })
    ).rejects.toEqual(new ShowDoctorError());
  });
});
