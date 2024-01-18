import { Test, TestingModule } from '@nestjs/testing';

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

describe('OrdersController', () => {
  let ordersController: OrdersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService],
    }).compile();

    ordersController = app.get<OrdersController>(OrdersController);
  });

  it('should create a new order', () => {
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

    expect(ordersController.create(payload)).toBe('Hello World!');
  });
});
