import { IsNotEmpty, IsNumber } from 'class-validator';

export class OrderPackageDto {
  @IsNumber()
  @IsNotEmpty()
  readonly height: number;

  @IsNumber()
  @IsNotEmpty()
  readonly length: number;

  @IsNumber()
  @IsNotEmpty()
  readonly width: number;

  @IsNumber()
  @IsNotEmpty()
  readonly weight: number;
}
