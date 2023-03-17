import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from '../employee.service';
import { EmployeeRepository } from '../repository/employee.repository';

const mockEmployeeRepository = () => ({
  findOne: jest.fn(),
  findOneHistory: jest.fn(),
  updateOne: jest.fn(),
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
      (spyEmployeeRepository.findOneHistory as jest.Mock).mockReturnValue({
        employee_id: 101,
      });
      // Excuute
      const result = await spyEmployeeService.findOneHistory(id);
      // Expect
      expect(spyEmployeeRepository.findOneHistory).toBeCalled();
      expect(spyEmployeeRepository.findOneHistory).toBeCalledWith(id);
      expect(result).toEqual({
        employee_id: 101,
      });
    });

    it('직원 이력 찾기 실패', async () => {
      const id = 100;
      // Method Mocking
      (spyEmployeeRepository.findOneHistory as jest.Mock).mockRejectedValue(
        new NotFoundException(),
      );
      try {
        // Excuute
        const result = await spyEmployeeService.findOneHistory(id);
      } catch (error) {
        // Expect
        expect(error).toBeTruthy;
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('UpdateEmployee', () => {
    it('직원 업데이트 성공', async () => {
      const id = 101;
      const body = { first_name: 'Steven' };
      // Method Mocking
      (spyEmployeeRepository.updateOne as jest.Mock).mockReturnValue({
        status: 200,
        success: true,
      });
      // Excuute
      const result = await spyEmployeeService.updateOne(id, body);
      // Expect
      expect(spyEmployeeRepository.updateOne).toBeCalled();
      expect(spyEmployeeRepository.updateOne).toBeCalledWith(id, body);
      expect(result).toEqual({ status: 200, success: true });
    });

    it('직원 업데이트 실패(해당 아이디 없음)', async () => {
      const id = 99;
      const body = { first_name: 'Steven' };
      // Method Mocking
      (spyEmployeeRepository.updateOne as jest.Mock).mockRejectedValue(
        new InternalServerErrorException(),
      );
      try {
        // Excuute
        const result = await spyEmployeeService.updateOne(id, body);
      } catch (error) {
        // Expect
        expect(error).toBeTruthy;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });

    it('직원 업데이트 실패(body 내용 없음)', async () => {
      const id = 99;
      const body = { first_name: 'Steven' };
      // Method Mocking
      (spyEmployeeRepository.findOne as jest.Mock).mockRejectedValue(
        new InternalServerErrorException(),
      );
      try {
        // Excuute
        const result = await spyEmployeeService.updateOne(id, body);
      } catch (error) {
        // Expect
        expect(error).toBeTruthy;
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });
});
