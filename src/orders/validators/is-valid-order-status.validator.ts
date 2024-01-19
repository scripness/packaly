import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { Order } from '../order.schema';
import * as mongoose from 'mongoose';

@ValidatorConstraint({
  async: true,
})
export class IsValidOrderStatusConstraint
  implements ValidatorConstraintInterface
{
  async validate(value: any, args: ValidationArguments) {
    const model = mongoose.connection;

    // const order = await model.findById(args.object['id']);

    return false;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} must be a valid order status`;
  }
}

export function IsValidOrderStatus(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidOrderStatusConstraint,
    });
  };
}
