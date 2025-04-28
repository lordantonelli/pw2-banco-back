import { BaseEntity } from 'src/shared/entities/base.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  TableInheritance,
} from 'typeorm';
import { Transaction } from './transaction.entity';
import { Branch } from 'src/branches/entities/branch.entity';
import { User } from 'src/auth/users/entities/user.entity';
import { InsufficientBalanceException } from 'src/exceptions/insufficient-balance.exception';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@TableInheritance({
  column: { type: 'varchar', name: 'type' },
})
export abstract class Account extends BaseEntity {
  @ApiProperty({
    description: 'Branch associated with the account',
    type: () => Branch,
  })
  @ManyToOne(() => Branch, { eager: true })
  branch: Branch;

  @ApiProperty({ description: 'User who owns the account', type: () => User })
  @ManyToOne(() => User, { eager: true })
  user: User;

  @ApiProperty({
    description: 'Current balance of the account',
    example: 1000.5,
  })
  @Column('double precision')
  balance: number;

  @ApiProperty({ description: 'Type of the account', example: 'Saving' })
  @Column({ readonly: false })
  readonly type: string;

  @ApiProperty({
    description: 'List of transactions associated with the account',
    type: [Transaction],
  })
  @OneToMany(() => Transaction, (transaction) => transaction.account, {
    eager: true,
  })
  transactions: Transaction[];

  debit(value: number): void {
    if (this.balance - value < 0) throw new InsufficientBalanceException();
    this.balance -= value;
  }

  credit(value: number): void {
    this.balance += value;
  }
}
