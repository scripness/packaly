import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { IsZipCode } from '../validators/is-zip-code.validator';

export class OrderAddressDTO {
  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly country: string;

  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsZipCode()
  readonly zipcode: string;

  @IsString()
  @IsNotEmpty()
  readonly phonenumber: string;
}
