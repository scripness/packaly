import { IsNotEmpty, IsString } from 'class-validator';

import { IsZipCode } from '../validators/is-zip-code.validator';

export class SearchOrdersDTO {
  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsZipCode()
  readonly zipcode: string;
}
