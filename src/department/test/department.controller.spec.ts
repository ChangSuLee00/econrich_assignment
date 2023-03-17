import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentController } from '../department.controller';
import { DepartmentService } from '../department.service';

const mockDepartmentService = () => ({
  findOne: jest.fn((id) => {
    if (id === 10) {
      return [{ department_id: 10 }];
    } else {
      return NotFoundException;
    }
  }),

  findLocation: jest.fn((id) => {
    if (id === 10) {
      return [{ location_id: 10 }];
    } else {
      return NotFoundException;
    }
  }),

  updateSalary: jest.fn((id, body) => {
    if (id === 10 && body.upper) {
      return { status: 200, success: true };
    } else {
      return InternalServerErrorException;
    }
  }),
});

describe('DepartmentController', () => {
  let controller: DepartmentController;
  let spyDepartmentService: DepartmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentController],
      providers: [
        { provide: DepartmentService, useFactory: mockDepartmentService },
      ],
    }).compile();

    controller = module.get<DepartmentController>(DepartmentController);
    spyDepartmentService = module.get<DepartmentService>(DepartmentService);
  });

  describe('FindDepartment', () => {
    it('부서 찾기 성공', async () => {
      const id = 10;

      // Excute
      const response = await controller.findOne(id);

      // Expect
      expect(spyDepartmentService.findOne).toBeCalled();
      expect(spyDepartmentService.findOne).toBeCalledWith(id);
      expect(response).toEqual([{ department_id: 10 }]);
    });

    it('부서 찾기 실패', async () => {
      const id = 11;

      // Excute
      const response = await controller.findOne(id);

      // Expect
      expect(spyDepartmentService.findOne).toBeCalled();
      expect(spyDepartmentService.findOne).toBeCalledWith(id);
      expect(response).toEqual(NotFoundException);
    });
  });

  describe('FindLocation', () => {
    it('부서 위치 찾기 성공', async () => {
      const id = 10;

      // Excute
      const response = await controller.findLocation(id);

      // Expect
      expect(spyDepartmentService.findLocation).toBeCalled();
      expect(spyDepartmentService.findLocation).toBeCalledWith(id);
      expect(response).toEqual([{ location_id: 10 }]);
    });

    it('부서 위치 찾기 실패', async () => {
      const id = 11;

      // Excute
      const response = await controller.findLocation(id);

      // Expect
      expect(spyDepartmentService.findLocation).toBeCalled();
      expect(spyDepartmentService.findLocation).toBeCalledWith(id);
      expect(response).toEqual(NotFoundException);
    });
  });

  describe('UpdateSalary', () => {
    it('급여 인상 성공', async () => {
      const id = 10;
      const body = { upper: '10' };

      // Excute
      const response = await controller.updateSalary(id, body);

      // Expect
      expect(spyDepartmentService.updateSalary).toBeCalled();
      expect(spyDepartmentService.updateSalary).toBeCalledWith(id, body);
      expect(response).toEqual({ status: 200, success: true });
    });

    it('급여 인상 실패(id 없음)', async () => {
      const id = 11;
      const body = { upper: '10' };

      // Excute
      const response = await controller.updateSalary(id, body);

      // Expect
      expect(spyDepartmentService.updateSalary).toBeCalled();
      expect(spyDepartmentService.updateSalary).toBeCalledWith(id, body);
      expect(response).toEqual(InternalServerErrorException);
    });

    it('급여 인상 실패(body.upper 없음)', async () => {
      const id = 10;
      const body = { upper: null };

      // Excute
      const response = await controller.updateSalary(id, body);

      // Expect
      expect(spyDepartmentService.updateSalary).toBeCalled();
      expect(spyDepartmentService.updateSalary).toBeCalledWith(id, body);
      expect(response).toEqual(InternalServerErrorException);
    });
  });
});
