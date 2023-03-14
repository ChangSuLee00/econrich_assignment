import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from '../employee.controller';
import { EmployeeService } from '../employee.service';

const mockEmployeeService = () => ({
  findOne: jest.fn((id) => {
    if (id === 100) {
      return [{ employee_id: 100 }];
    } else {
      return NotFoundException;
    }
  }),
});

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let spyEmployeeService: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        { provide: EmployeeService, useFactory: mockEmployeeService },
      ],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    spyEmployeeService = module.get<EmployeeService>(EmployeeService);
  });

  describe('FindEmployee', () => {
    it('직원 찾기 성공', async () => {
      const id = 100;

      // Excute
      const response = await controller.findOne(id);

      // Expect
      expect(spyEmployeeService.findOne).toBeCalled();
      expect(spyEmployeeService.findOne).toBeCalledWith(id);
      expect(response).toEqual([{ employee_id: 100 }]);
    });

    it('직원 찾기 실패', async () => {
      const id = 99;

      // Excute
      const response = await controller.findOne(id);

      // Expect
      expect(spyEmployeeService.findOne).toBeCalled();
      expect(spyEmployeeService.findOne).toBeCalledWith(id);
      expect(response).toEqual(NotFoundException);
    });
  });
});
