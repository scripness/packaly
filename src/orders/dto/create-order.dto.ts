import {
  ArrayMinSize,
  IsArray,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

import { OrderAddressDto } from './order-address.dto';
import { OrderPackageDto } from './order-package.dto';

export class CreateOrderDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => OrderAddressDto)
  readonly dropoff: OrderAddressDto;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => OrderAddressDto)
  readonly pickup: OrderAddressDto;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderPackageDto)
  readonly packages: OrderPackageDto[];
}
