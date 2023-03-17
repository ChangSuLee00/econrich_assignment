import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from '../employee.service';
import { EmployeeRepository } from '../repository/employee.repository';

const mockEmployeeRepository = () => ({
  findOne: jest.fn(),
});

describe('EmployeeService', () => {
  let spyEmployeeService: EmployeeService;
  let spyEmployeeRepository: EmployeeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        { provide: EmployeeRepository, useFactory: mockEmployeeRepository },
      ],
    }).compile();

    spyEmployeeService = module.get<EmployeeService>(EmployeeService);
    spyEmployeeRepository = module.get<EmployeeRepository>(EmployeeRepository);
  });

  describe('FindEmployee', () => {
    it('직원 찾기 성공', async () => {
      const id = 100;
      // Method Mocking
      (spyEmployeeRepository.findOne as jest.Mock).mockReturnValue({
        employee_id: 100,
      });
      // Excuute
      const result = await spyEmployeeService.findOne(id);
      // Expect
      expect(spyEmployeeRepository.findOne).toBeCalled();
      expect(spyEmployeeRepository.findOne).toBeCalledWith(id);
      expect(result).toEqual({
        employee_id: 100,
      });
    });

    it('직원 찾기 실패', async () => {
      const id = 99;
      // Method Mocking
      (spyEmployeeRepository.findOne as jest.Mock).mockRejectedValue(
        new NotFoundException(),
      );
      try {
        // Excuute
        const result = await spyEmployeeService.findOne(id);
      } catch (error) {
        // Expect
        expect(error).toBeTruthy;
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('FindEmployeeHistory', () => {
    it('직원 이력 찾기 성공', async () => {
      const id = 101;
      // Method Mocking
      (spyEmployeeRepository.findOne as jest.Mock).mockReturnValue({
        employee_id: 101,
      });
      // Excuute
      const result = await spyEmployeeService.findOne(id);
      // Expect
      expect(spyEmployeeRepository.findOne).toBeCalled();
      expect(spyEmployeeRepository.findOne).toBeCalledWith(id);
      expect(result).toEqual({
        employee_id: 101,
      });
    });

    it('직원 이력 찾기 실패', async () => {
      const id = 100;
      // Method Mocking
      (spyEmployeeRepository.findOne as jest.Mock).mockRejectedValue(
        new NotFoundException(),
      );
      try {
        // Excuute
        const result = await spyEmployeeService.findOne(id);
      } catch (error) {
        // Expect
        expect(error).toBeTruthy;
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
