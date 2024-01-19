import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

import { OrderAddressDto } from '../dto/order-address.dto';
import { OrderPackageDto } from '../dto/order-package.dto';
import { OrderStatus } from '../interfaces/order-status.interface';

export type OrderDocument = HydratedDocument<Order>;

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
