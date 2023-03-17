import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('Employee (e2e)', () => {
    it('/employee/:id (GET)', () => {
      return request(app.getHttpServer()).get('/employee/100').expect(200);
    });

    it('/employee/history/:id (GET)', () => {
      return request(app.getHttpServer())
        .get('/employee/history/100')
        .expect(200);
    });

    it('/employee/:id (PATCH)', () => {
      const data = { first_name: 'Stephan' };
      return request(app.getHttpServer())
        .patch('/employee/100')
        .send(data)
        .expect(200);
    });
  });

  describe('Department (e2e)', () => {
    it('/department/:id (GET)', () => {
      return request(app.getHttpServer()).get('/department/10').expect(200);
    });

    it('/department/location/:id (GET)', () => {
      return request(app.getHttpServer())
        .get('/department/location/10')
        .expect(200);
    });

    it('/department/:id (PATCH)', () => {
      const data = { upper: '1' };
      return request(app.getHttpServer())
        .patch('/department/10')
        .send(data)
        .expect(200);
    });
  });

  describe('Air (e2e)', () => {
    it('/air?sidoName=example (GET)', () => {
      const sido = encodeURI('서울');
      return request(app.getHttpServer())
        .get(`/air?sidoName=${sido}`)
        .expect(200);
    });
  });

  afterAll((done) => {
    app.close();
    done();
  });
});
