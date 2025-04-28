import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Transaction } from './entities/transaction.entity';
import { DefaultAccountsService } from './default-accounts.service';
import { SavingAccountsService } from './saving-accounts.service';
import { DefaultAccountsController } from './default-accounts.controller';
import { SavingAccountsController } from './saving-accounts.controller';
import { DefaultAccount } from './entities/default-account.entity';
import { SavingAccount } from './entities/saving-account.entity';
import { TransactionService } from './transaction.service';
import { UsersModule } from 'src/auth/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Account,
      DefaultAccount,
      SavingAccount,
      Transaction,
    ]),
    UsersModule,
  ],
  controllers: [
    DefaultAccountsController,
    SavingAccountsController,
    AccountsController,
  ],
  providers: [
    AccountsService,
    DefaultAccountsService,
    SavingAccountsService,
    TransactionService,
  ],
})
export class AccountsModule {}
