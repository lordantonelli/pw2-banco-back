import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import {
  EntityManager,
  EntitySchema,
  FindOptionsWhere,
  ObjectType,
} from 'typeorm';

export interface UniqueValidationArguments<E> extends ValidationArguments {
  constraints: [
    ObjectType<E> | EntitySchema<E> | string,
    ((object: object) => FindOptionsWhere<E>) | keyof E,
  ];
}

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate<E>(
    value: any,
    args: UniqueValidationArguments<E>,
  ): Promise<boolean> {
    // catch options from decorator
    const [EntityClass, findCondition = args.property] = args.constraints;

    // database query check data is exists
    const count = await this.entityManager.getRepository(EntityClass).count({
      where:
        typeof findCondition === 'function'
          ? findCondition(args.object)
          : {
              [findCondition || args.property]: value,
            },
    });
    return count == 0;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    // return custom field message
    const field = validationArguments?.property;
    return `${field} is already exist`;
  }
}
