import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, Types } from 'mongoose';

import { Order } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './interfaces/order-status.interface';
import { calculatePrice } from './utils/calculatePrice';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(createOrderDto: CreateOrderDto): Promise<{
    id: Types.ObjectId;
    price: number;
    status: OrderStatus;
  }> {
    const order = new this.orderModel(createOrderDto);

    order.set('price', calculatePrice(createOrderDto.packages));
    order.set('status', OrderStatus.CREATED);

    const savedOrder = await order.save();

    return {
      id: savedOrder._id,
      status: savedOrder.status,
      price: savedOrder.price,
    };
  }
}
