import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

import { OrderAddressDto } from '../dto/order-address.dto';
import { OrderPackageDto } from '../dto/order-package.dto';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({
    required: true,
  })
  dropoff: OrderAddressDto;

  @Prop({
    required: true,
  })
  pickup: OrderAddressDto;

  @Prop({
    required: true,
  })
  packages: OrderPackageDto[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
