import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { OrdersService } from './orders.service';

import { CreateOrderDTO } from './dto/create-order.dto';
import { UpdateOrderStatusDTO } from './dto/update-order-status.dto';
import { SearchOrdersDTO } from './dto/search-orders.dto';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDTO: CreateOrderDTO) {
    return await this.ordersService.create(createOrderDTO);
  }

  @Post('update-status')
  async updateStatus(@Body() updateOrderStatusDTO: UpdateOrderStatusDTO) {
    return await this.ordersService.updateStatus(updateOrderStatusDTO);
  }

  @Get('search')
  async search(@Query() searchOrdersDTO: SearchOrdersDTO) {
    return await this.ordersService.search(searchOrdersDTO);
  }
}
