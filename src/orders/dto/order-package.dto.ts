import { IsNotEmpty, IsNumber } from 'class-validator';

export class OrderPackageDto {
  @IsNumber()
  @IsNotEmpty()
  height: number;

  @IsNumber()
  @IsNotEmpty()
  length: number;

  @IsNumber()
  @IsNotEmpty()
  width: number;

  @IsNumber()
  @IsNotEmpty()
  weight: number;
}
