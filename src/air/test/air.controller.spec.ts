import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { query } from 'express';
import { AirController } from '../air.controller';
import { AirService } from '../air.service';
import { SidoName } from '../interfaces/sidoName.type';

const mockAirService = () => ({
  findAirBySidoName: jest.fn((query) => {
    if (query.sidoName === '서울') {
      return [{ sidoName: '서울' }];
    } else {
      return InternalServerErrorException;
    }
  }),
});

describe('AirController', () => {
  let controller: AirController;
  let spyAirService: AirService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AirController],
      providers: [{ provide: AirService, useFactory: mockAirService }],
    }).compile();

    controller = module.get<AirController>(AirController);
    spyAirService = module.get<AirService>(AirService);
  });

  describe('FindAirCondition', () => {
    it('시 도 공기 상태 찾기 성공', async () => {
      const query: SidoName = { sidoName: '서울' };

      // Excute
      const response = await controller.findAirBySidoName(query);

      // Expect
      expect(spyAirService.findAirBySidoName).toBeCalled();
      expect(spyAirService.findAirBySidoName).toBeCalledWith(query);
      expect(response).toEqual([{ sidoName: '서울' }]);
    });

    it('시 도 공기 상태 찾기 실패', async () => {
      const query: SidoName = { sidoName: null };

      // Excute
      const response = await controller.findAirBySidoName(query);

      // Expect
      expect(spyAirService.findAirBySidoName).toBeCalled();
      expect(spyAirService.findAirBySidoName).toBeCalledWith(query);
      expect(response).toEqual(InternalServerErrorException);
    });
  });
});
