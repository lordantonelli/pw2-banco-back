import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultAccount } from './entities/default-account.entity';
import { AccountsService } from './accounts.service';
import { DataSource, Repository } from 'typeorm';
import { TransactionService } from './transaction.service';

@Injectable()
export class DefaultAccountsService extends AccountsService {
  constructor(
    @InjectRepository(DefaultAccount)
    protected readonly repository: Repository<DefaultAccount>,
    protected readonly transactionService: TransactionService,
    protected readonly dataSource: DataSource,
  ) {
    super(repository, transactionService, dataSource);
  }
}
