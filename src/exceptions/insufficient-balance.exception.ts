import { BadRequestException } from '@nestjs/common';

export class InsufficientBalanceException extends BadRequestException {
  constructor() {
    super('Insufficient balance to complete the withdrawal.');
  }
}
