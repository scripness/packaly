import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

import { OrderAddressDto } from './dto/order-address.dto';
import { OrderPackageDto } from './dto/order-package.dto';

export type OrderDocument = HydratedDocument<Order>;

export enum OrderStatus {
  CREATED = 'CREATED',
  PICKED_UP = 'PICKED_UP',
  CANCELLED = 'CANCELLED',
  DELIVERED = 'DELIVERED',
  RETURNING = 'RETURNING',
  RETURNED = 'RETURNED',
}

@Schema()
export class Order {
  @Prop()
  dropoff: OrderAddressDto;

  @Prop()
  pickup: OrderAddressDto;

  @Prop()
  packages: OrderPackageDto[];

  @Prop()
  price: number;

  @Prop()
  status: OrderStatus;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
