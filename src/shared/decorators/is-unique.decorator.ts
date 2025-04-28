import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsUniqueConstraint } from '../validators/is-unique.constraint';
import { EntitySchema, FindOptionsWhere, ObjectType } from 'typeorm';

// decorator function
export function IsUnique<E>(
  entity: ObjectType<E> | EntitySchema<E> | string,
  condition?: ((object: object) => FindOptionsWhere<E>) | keyof E,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity, condition],
      validator: IsUniqueConstraint,
    });
  };
}
