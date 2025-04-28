import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { DataSource, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { MovingAccountDto } from './dto/moving-account.dto';
import { User } from 'src/auth/users/entities/user.entity';
import { AccountNotOwnedException } from 'src/exceptions/account-not-owned.exception';
import { Transaction } from './entities/transaction.entity';
import { TransactionService } from './transaction.service';
import { MovingTransferAccountDto } from './dto/moving-transfer-account.dto';
import { SameAccountTransferException } from 'src/exceptions/same-account-transfer.exception';
import { BaseService } from 'src/shared/services/base.service';

@Injectable()
export class AccountsService extends BaseService<Account> {
  constructor(
    @InjectRepository(Account)
    protected readonly repository: Repository<Account>,
    protected readonly transactionService: TransactionService,
    protected readonly dataSource: DataSource,
  ) {
    super(repository);
  }

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const record = this.repository.create(createAccountDto);
    if (!createAccountDto.balance) record.balance = 0;
    return await this.repository.save(record);
  }

  getSearchCondition(search: string | undefined): FindOptionsWhere<Account>[] {
    const where: FindOptionsWhere<Account>[] = [];
    if (search) {
      const ilike = ILike(`%${search}%`);
      where.push({ user: { name: ilike } });
      where.push({ branch: { name: ilike } });
    }
    return where;
  }

  async findOneByUser(id: number, user: User): Promise<Account> {
    const record = await this.findOne(id);
    if (!user || !record.user || record.user.id !== user.id)
      throw new AccountNotOwnedException();
    return record;
  }

  async credit(
    id: number,
    user: User,
    movingAccountDto: MovingAccountDto,
  ): Promise<Transaction> {
    const account = await this.findOneByUser(id, user);
    account.credit(movingAccountDto.value);

    let transaction;
    await this.dataSource.transaction(async (manager) => {
      await manager.save(account);
      transaction = await manager.save(
        this.transactionService.credit(account, movingAccountDto.value),
      );
    });

    return transaction;
  }

  async debit(
    id: number,
    user: User,
    movingAccountDto: MovingAccountDto,
  ): Promise<Transaction> {
    const account = await this.findOneByUser(id, user);
    account.debit(movingAccountDto.value);

    let transaction;
    await this.dataSource.transaction(async (manager) => {
      await manager.save(account);
      transaction = await manager.save(
        this.transactionService.debit(account, movingAccountDto.value),
      );
    });

    return transaction;
  }

  async transfer(
    id: number,
    user: User,
    movingTransferAccountDto: MovingTransferAccountDto,
  ): Promise<Transaction> {
    const accountFrom = await this.findOneByUser(id, user);
    const accountTo = await this.findOne(movingTransferAccountDto.accountTo.id);

    if (accountFrom.id === accountTo.id) {
      throw new SameAccountTransferException();
    }

    accountFrom.debit(movingTransferAccountDto.value);
    accountTo.credit(movingTransferAccountDto.value);

    let transaction;
    await this.dataSource.transaction(async (manager) => {
      await manager.save(accountFrom);
      await manager.save(accountTo);
      transaction = await manager.save(
        this.transactionService.transfer(
          accountFrom,
          accountTo,
          movingTransferAccountDto.value,
        ),
      );
    });

    return transaction;
  }
}
