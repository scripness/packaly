import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';

import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { OrderStatus } from '../src/orders/interfaces/order-status.interface';

describe('OrdersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  describe('POST /api/orders', () => {
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

    it('fails to create an order due to validation', async () => {
      const invalidPayload = structuredClone(payload);

      invalidPayload.dropoff.address = '';
      invalidPayload.dropoff.zipcode = '';

      invalidPayload.pickup.address = '';
      invalidPayload.pickup.zipcode = '';

      invalidPayload.packages = [];

      const response = await request(app.getHttpServer())
        .post('/api/orders')
        .send(invalidPayload);

      expect(response.status).toBe(400);

      expect(response.body.message).toEqual([
        'dropoff.address should not be empty',
        'dropoff.zipcode must be a valid zip code and equal to 6 characters excluding any spaces',
        'pickup.address should not be empty',
        'pickup.zipcode must be a valid zip code and equal to 6 characters excluding any spaces',
        'packages must contain at least 1 elements',
      ]);
    });

    it('creates an order', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/orders')
        .send(payload);

      expect(response.status).toBe(201);

      expect(response.body).toEqual({
        id: expect.stringContaining(''),
        price: 7 + 1.5,
        status: OrderStatus.CREATED,
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
