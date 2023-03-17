import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentService } from '../department.service';
import { DepartmentRepository } from '../repository/employee.repository';

const mockDepartmentRepository = () => ({
  findOne: jest.fn(),
});

describe('DepartmentService', () => {
  let spyDepartmentService: DepartmentService;
  let spyDepartmentRepository: DepartmentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepartmentService,
        { provide: DepartmentRepository, useFactory: mockDepartmentRepository },
      ],
    }).compile();

    spyDepartmentService = module.get<DepartmentService>(DepartmentService);
    spyDepartmentRepository =
      module.get<DepartmentRepository>(DepartmentRepository);
  });

  describe('FindEmployee', () => {
    it('직원 찾기 성공', async () => {
      const id = 100;
      // Method Mocking
      (spyDepartmentRepository.findOne as jest.Mock).mockReturnValue({
        employee_id: 100,
      });
      // Excuute
      const result = await spyDepartmentService.findOne(id);
      // Expect
      expect(spyDepartmentRepository.findOne).toBeCalled();
      expect(spyDepartmentRepository.findOne).toBeCalledWith(id);
      expect(result).toEqual({
        employee_id: 100,
      });
    });

    it('직원 찾기 실패', async () => {
      const id = 99;
      // Method Mocking
      (spyDepartmentRepository.findOne as jest.Mock).mockRejectedValue(
        new NotFoundException(),
      );
      try {
        // Excuute
        const result = await spyDepartmentService.findOne(id);
      } catch (error) {
        // Expect
        expect(error).toBeTruthy;
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
