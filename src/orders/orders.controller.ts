import { Body, Controller, Post } from '@nestjs/common';

import { OrdersService } from './orders.service';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.create(createOrderDto);
  }

  @Post('update-status')
  async updateStatus(@Body() updateOrderStatusDto: UpdateOrderStatusDto) {
    return await this.ordersService.updateStatus(updateOrderStatusDto);
  }
}
