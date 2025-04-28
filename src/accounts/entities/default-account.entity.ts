import { ChildEntity, Column } from 'typeorm';
import { Account } from './account.entity';
import { InsufficientBalanceException } from 'src/exceptions/insufficient-balance.exception';
import { ApiProperty } from '@nestjs/swagger';

@ChildEntity('Conta Corrente')
export class DefaultAccount extends Account {
  @ApiProperty({ description: 'Credit limit of the account', example: 500.0 })
  @Column('double precision')
  limit: number;

  debit(value: number): void {
    if (this.limit + this.balance - value < 0)
      throw new InsufficientBalanceException();
    this.balance -= value;
  }
}
