import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, Types } from 'mongoose';

import { Order, OrderStatus } from './order.schema';

import { CreateOrderDTO } from './dto/create-order.dto';
import { UpdateOrderStatusDTO } from './dto/update-order-status.dto';
import { SearchOrdersDTO } from './dto/search-orders.dto';

import { calculatePrice } from './utils/calculatePrice';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(createOrderDTO: CreateOrderDTO): Promise<{
    id: Types.ObjectId;
    price: number;
    status: OrderStatus;
  }> {
    const order = new this.orderModel(createOrderDTO);

    order.set('price', calculatePrice(createOrderDTO.packages));
    order.set('status', OrderStatus.CREATED);

    const savedOrder = await order.save();

    return {
      id: savedOrder._id,
      status: savedOrder.status,
      price: savedOrder.price,
    };
  }

  async updateStatus({ id, status }: UpdateOrderStatusDTO): Promise<{
    id: Types.ObjectId;
    oldStatus: OrderStatus;
    newStatus: OrderStatus;
  }> {
    const order = await this.orderModel.findById(id);

    const oldStatus = order.status;

    order.status = status;

    const updatedOrder = await order.save();

    return {
      id: updatedOrder._id,
      oldStatus,
      newStatus: status,
    };
  }

  async search({ address, zipcode }: SearchOrdersDTO): Promise<Order[]> {
    return await this.orderModel
      .find({
        'dropoff.address': {
          $regex: address,
          $options: 'i',
        },
        'dropoff.zipcode': zipcode,
      })
      .exec();
  }
}
