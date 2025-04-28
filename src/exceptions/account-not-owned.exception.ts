import { ForbiddenException } from '@nestjs/common';

export class AccountNotOwnedException extends ForbiddenException {
  constructor() {
    super('This bank account does not belong to the authenticated user');
  }
}
