import { InMemoryDoctorsRepository } from '../../repositories/in-memory/InMemoryDoctorsRepository';
import { ListAllDoctorsUserCase } from './ListAllDoctorsUserCase';

let listAllDoctorsUseCase: ListAllDoctorsUserCase;
let inMemoryDoctorsRepository: InMemoryDoctorsRepository;

describe('ListAllDoctorsUseCase', () => {
  beforeEach(() => {
    inMemoryDoctorsRepository = new InMemoryDoctorsRepository();

    listAllDoctorsUseCase = new ListAllDoctorsUserCase(
      inMemoryDoctorsRepository
    );
  });

  it('should be able to list all doctors', async () => {
    await inMemoryDoctorsRepository.create({
      name: 'Mr. Erik Mayert',
      phone: '(832) 398-4578 x248',
      crm: '64650',
      user_id: '1',
    });

    await inMemoryDoctorsRepository.create({
      name: 'Diana Pouros',
      crm: '64658',
      phone: '574-550-1339',
      user_id: '2',
    });

    const doctors = await listAllDoctorsUseCase.execute();

    expect(doctors.length).toEqual(2);
    expect(doctors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Mr. Erik Mayert',
          phone: '(832) 398-4578 x248',
          crm: '64650',
          user_id: '1',
        }),
        expect.objectContaining({
          name: 'Diana Pouros',
          crm: '64658',
          phone: '574-550-1339',
          user_id: '2',
        }),
      ])
    );
  });
});
