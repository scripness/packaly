import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';

describe('OrdersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it('creates an order', () => {
    const payload = {
      dropoff: {
        address: 'Oudenoord 330',
        city: 'Utrecht',
        country: 'Netherlands',
        email: 'example@gmail.com',
        name: 'Name',
        zipcode: '1234 AB',
        phonenumber: '+31612795443',
      },
      pickup: {
        address: 'Oudenoord 330',
        city: 'Utrecht',
        country: 'Netherlands',
        email: 'example@gmail.com',
        phonenumber: '+31612795443',
        zipcode: '5678 XZ',
        name: 'Name',
      },
      packages: [
        {
          height: 50,
          length: 20,
          width: 10,
          weight: 50,
        },
        {
          height: 10,
          length: 10,
          width: 10,
          weight: 5,
        },
      ],
    };

    return request(app.getHttpServer())
      .post('/orders')
      .send(payload)
      .expect(200)
      .expect('OK');
  });
});
