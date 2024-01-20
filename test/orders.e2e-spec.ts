import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';

import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { calculatePrice } from '../src/orders/utils/calculatePrice';
import { OrderStatus } from '../src/orders/order.schema';

const createOrderPayload = {
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
    it('fails to create an order due to validation', async () => {
      const invalidPayload = structuredClone(createOrderPayload);

      invalidPayload.dropoff.address = '';
      invalidPayload.dropoff.zipcode = '';

      invalidPayload.pickup.address = '';
      invalidPayload.pickup.zipcode = '';

      invalidPayload.packages = [];

      const response = await request(app.getHttpServer())
        .post('/api/orders')
        .send(invalidPayload)
        .expect(400);

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
        .send(createOrderPayload)
        .expect(201);

      expect(response.body).toEqual({
        id: expect.stringContaining(''),
        price: calculatePrice(createOrderPayload.packages),
        status: OrderStatus.CREATED,
      });
    });
  });

  describe('POST /api/orders/update-status', () => {
    it('fails to update due to non-existing status', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/orders/update-status')
        .send({
          id: '',
          status: 'NON_EXISTING',
        })
        .expect(400);

      expect(response.body.message).toEqual([
        'id must be a mongodb id',
        'status must be a valid order status',
      ]);
    });

    it('fails to update due to invalid status', async () => {
      const createOrderResponse = await request(app.getHttpServer())
        .post('/api/orders')
        .send(createOrderPayload)
        .expect(201);

      const updateOrderStatusPayload = {
        id: createOrderResponse.body.id,
        status: OrderStatus.DELIVERED,
      };

      const response = await request(app.getHttpServer())
        .post('/api/orders/update-status')
        .send(updateOrderStatusPayload)
        .expect(400);

      expect(response.body.message).toEqual([
        'status must be a valid order status',
      ]);
    });

    it('updates the order status', async () => {
      const createOrderResponse = await request(app.getHttpServer())
        .post('/api/orders')
        .send(createOrderPayload)
        .expect(201);

      const updateOrderStatusPayload = {
        id: createOrderResponse.body.id,
        status: OrderStatus.PICKED_UP,
      };

      const response = await request(app.getHttpServer())
        .post('/api/orders/update-status')
        .send(updateOrderStatusPayload)
        .expect(201);

      expect(response.body).toEqual({
        id: updateOrderStatusPayload.id,
        oldStatus: createOrderResponse.body.status,
        newStatus: updateOrderStatusPayload.status,
      });
    });
  });

  describe('GET /api/orders/search?address=&zipcode=', () => {
    it('fails to search due to missing input', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/orders/search')
        .query({
          address: '',
          zipcode: '',
        })
        .expect(400);

      expect(response.body.message).toEqual([
        'address should not be empty',
        'zipcode must be a valid zip code and equal to 6 characters excluding any spaces',
      ]);
    });

    it('searches orders by dropoff address', async () => {
      const address = Math.random().toString(20).substring(2, 12);
      const zipcode = Math.random().toString(20).substring(2, 8);

      const _createOrderPayload = {
        ...createOrderPayload,

        dropoff: {
          ...createOrderPayload.dropoff,

          address,
          zipcode,
        },
      };

      await request(app.getHttpServer())
        .post('/api/orders')
        .send(_createOrderPayload)
        .expect(201);

      const response = await request(app.getHttpServer())
        .get('/api/orders/search')
        .query({
          address: address.slice(0, address.length / 2),
          zipcode,
        })
        .expect(200);

      expect(response.body).toHaveLength(1);

      expect(response.body).toEqual(
        expect.arrayContaining([expect.objectContaining(_createOrderPayload)]),
      );
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
