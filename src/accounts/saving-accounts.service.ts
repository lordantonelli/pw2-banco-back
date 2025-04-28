import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { SavingAccount } from './entities/saving-account.entity';
import { TransactionService } from './transaction.service';
import { AccountsService } from './accounts.service';

@Injectable()
export class SavingAccountsService extends AccountsService {
  constructor(
    @InjectRepository(SavingAccount)
    protected readonly repository: Repository<SavingAccount>,
    protected readonly transactionService: TransactionService,
    protected dataSource: DataSource,
  ) {
    super(repository, transactionService, dataSource);
  }
}
