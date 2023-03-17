import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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

  findOneHistory: jest.fn((id) => {
    if (id === 101) {
      return [{ employee_id: 101 }];
    } else {
      return NotFoundException;
    }
  }),

  updateOne: jest.fn((id, body) => {
    if (id !== 101 || Object.keys(body).length === 0) {
      return InternalServerErrorException;
    } else {
      return { status: 200, success: true };
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

  describe('FindEmployeeHistory', () => {
    it('직원 이력 찾기 성공', async () => {
      const id = 101;

      // Excute
      const response = await controller.findOneHistory(id);

      // Expect
      expect(spyEmployeeService.findOneHistory).toBeCalled();
      expect(spyEmployeeService.findOneHistory).toBeCalledWith(id);
      expect(response).toEqual([{ employee_id: 101 }]);
    });

    it('직원 이력 찾기 실패', async () => {
      const id = 100;

      // Excute
      const response = await controller.findOneHistory(id);

      // Expect
      expect(spyEmployeeService.findOneHistory).toBeCalled();
      expect(spyEmployeeService.findOneHistory).toBeCalledWith(id);
      expect(response).toEqual(NotFoundException);
    });
  });

  describe('UpdateEmployee', () => {
    it('직원 업데이트 성공', async () => {
      const id = 101;
      const body = { first_name: 'Steven' };

      // Excute
      const response = await controller.updateOne(id, body);

      // Expect
      expect(spyEmployeeService.updateOne).toBeCalled();
      expect(spyEmployeeService.updateOne).toBeCalledWith(id, body);
      expect(response).toEqual({ status: 200, success: true });
    });

    it('직원 업데이트 실패(유저 id 없음)', async () => {
      const id = null;
      const body = { first_name: 'Steven' };

      // Excute
      const response = await controller.updateOne(id, body);

      // Expect
      expect(spyEmployeeService.updateOne).toBeCalled();
      expect(spyEmployeeService.updateOne).toBeCalledWith(id, body);
      expect(response).toEqual(InternalServerErrorException);
    });

    it('직원 업데이트 실패(body 내용 없음)', async () => {
      const id = 101;
      const body = {};

      // Excute
      const response = await controller.updateOne(id, body);

      // Expect
      expect(spyEmployeeService.updateOne).toBeCalled();
      expect(spyEmployeeService.updateOne).toBeCalledWith(id, body);
      expect(response).toEqual(InternalServerErrorException);
    });
  });
});
