import * as mongoose from 'mongoose';

import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { Order, OrderSchema, OrderStatus } from '../order.schema';

import { validateStatusTransition } from '../utils/validateStatusTransition';

@ValidatorConstraint({
  async: true,
})
export class IsValidOrderStatusConstraint
  implements ValidatorConstraintInterface
{
  async validate(value: any, args: ValidationArguments) {
    await mongoose.connect('mongodb://localhost/nest');

    const model = mongoose.model(Order.name, OrderSchema);

    if (!('id' in args.object) || !args.object.id) {
      return false;
    }

    const order = await model.findById(args.object.id);

    return (
      Object.values(OrderStatus).includes(value) &&
      validateStatusTransition(order.status, value)
    );
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
