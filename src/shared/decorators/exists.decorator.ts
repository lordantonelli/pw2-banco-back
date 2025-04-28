import { registerDecorator, ValidationOptions } from 'class-validator';
import { EntitySchema, ObjectType } from 'typeorm';
import { ExistsConstraint } from '../validators/exists.constraint';

// decorator function
export function Exists<E>(
  entity: ObjectType<E> | EntitySchema<E> | string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'Exists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity],
      validator: ExistsConstraint,
    });
  };
}
