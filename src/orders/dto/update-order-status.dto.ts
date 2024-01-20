import { IsMongoId } from 'class-validator';

import { OrderStatus } from '../order.schema';

import { IsValidOrderStatus } from '../validators/is-valid-order-status.validator';

export class UpdateOrderStatusDTO {
  @IsMongoId()
  readonly id: string;

  @IsValidOrderStatus()
  status: OrderStatus;
}
