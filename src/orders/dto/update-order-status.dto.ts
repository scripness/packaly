import { IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

import { OrderStatus } from '../order.schema';

import { IsValidOrderStatus } from '../validators/is-valid-order-status.validator';

export class UpdateOrderStatusDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  readonly id: string;

  @IsEnum(OrderStatus)
  @IsValidOrderStatus()
  status: OrderStatus;
}
