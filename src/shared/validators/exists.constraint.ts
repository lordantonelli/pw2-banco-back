import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager, EntitySchema, ObjectType } from 'typeorm';

export interface ExistsValidationArguments<E> extends ValidationArguments {
  constraints: [ObjectType<E> | EntitySchema<E> | string];
}

@ValidatorConstraint({ name: 'ExistsConstraint', async: true })
@Injectable()
export class ExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: EntityManager) {}

  async validate<E>(
    value: any,
    args: ExistsValidationArguments<E>,
  ): Promise<boolean> {
    // catch options from decorator
    const [EntityClass] = args.constraints;

    // database query check data is exists
    return await this.entityManager
      .getRepository(EntityClass)
      .existsBy({ id: value.id });
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    // return custom field message
    const field = validationArguments?.property;
    return `${field} with id [${validationArguments?.value.id}] not exist`;
  }
}
