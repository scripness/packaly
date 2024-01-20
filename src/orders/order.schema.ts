import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

import { OrderAddressDTO } from './dto/order-address.dto';
import { OrderPackageDTO } from './dto/order-package.dto';

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
  dropoff: OrderAddressDTO;

  @Prop()
  pickup: OrderAddressDTO;

  @Prop()
  packages: OrderPackageDTO[];

  @Prop()
  price: number;

  @Prop()
  status: OrderStatus;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
