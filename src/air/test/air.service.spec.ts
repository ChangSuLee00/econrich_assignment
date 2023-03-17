import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AirService } from '../air.service';
import { SidoName } from '../interfaces/sidoName.type';
import { AirRepository } from '../repository/employee.repository';

const mockAirRepository = () => ({
  findAirBySidoName: jest.fn(),
});

describe('AirService', () => {
  let spyAirService: AirService;
  let spyAirRepository: AirRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AirService,
        { provide: AirRepository, useFactory: mockAirRepository },
      ],
    }).compile();

    spyAirService = module.get<AirService>(AirService);
    spyAirRepository = module.get<AirRepository>(AirRepository);
  });

  describe('FindDepartment', () => {
    it('시 도 공기 상태 찾기 성공', async () => {
      const query: SidoName = { sidoName: '서울' };
      // Method Mocking
      (spyAirRepository.findAirBySidoName as jest.Mock).mockReturnValue({
        employee_id: 100,
      });
      // Excuute
      const result = await spyAirService.findAirBySidoName(query);
      // Expect
      expect(spyAirRepository.findAirBySidoName).toBeCalled();
      expect(spyAirRepository.findAirBySidoName).toBeCalledWith(query);
      expect(result).toEqual({
        employee_id: 100,
      });
    });

    it('시 도 공기 상태 찾기 실패', async () => {
      const query: SidoName = { sidoName: '서울' };
      // Method Mocking
      (spyAirRepository.findAirBySidoName as jest.Mock).mockRejectedValue(
        new InternalServerErrorException(),
      );
      try {
        // Excuute
        const result = await spyAirRepository.findAirBySidoName(query);
      } catch (error) {
        // Expect
        expect(error).toBeTruthy;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });
});
