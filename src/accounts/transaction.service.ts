import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly repository: Repository<Transaction>,
  ) {}

  credit(account: Account, value: number): Transaction {
    return this.repository.create({
      account,
      value,
      description: 'Depósito',
    });
  }

  debit(account: Account, value: number): Transaction {
    return this.repository.create({
      account,
      value: -value,
      description: 'Saque',
    });
  }

  transfer(
    accountFrom: Account,
    accountTo: Account,
    value: number,
  ): Transaction[] {
    const recordTo = this.repository.create({
      account: accountTo,
      value: value,
      description: `Transferência recebida da Agência [${accountFrom.branch.id}] - Conta ${accountFrom.id}`,
    });

    const recordFrom = this.repository.create({
      account: accountFrom,
      value: -value,
      description: `Transferência para Agência [${accountTo.branch.id}] - Conta ${accountTo.id}`,
    });

    return [recordTo, recordFrom];
  }
}
