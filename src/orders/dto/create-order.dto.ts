import {
  ArrayMinSize,
  IsArray,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

import { OrderAddressDTO } from './order-address.dto';
import { OrderPackageDTO } from './order-package.dto';

export class CreateOrderDTO {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => OrderAddressDTO)
  readonly dropoff: OrderAddressDTO;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => OrderAddressDTO)
  readonly pickup: OrderAddressDTO;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderPackageDTO)
  readonly packages: OrderPackageDTO[];
}
