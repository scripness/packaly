import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export function IsZipCode(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isZipCode',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          const valueWithoutSpaces = value.replace(/ /g, '');

          return (
            typeof valueWithoutSpaces === 'string' &&
            valueWithoutSpaces.length === 6
          );
        },

        defaultMessage(validationArguments?: ValidationArguments): string {
          return `${validationArguments.property} must be a valid zip code and equal to 6 characters excluding any spaces`;
        },
      },
    });
  };
}
