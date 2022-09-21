import { Module } from '@nestjs/common';
import { BankBranchsService } from './bank-branchs.service';
import { BankBranchsController } from './bank-branchs.controller';

@Module({
  controllers: [BankBranchsController],
  providers: [BankBranchsService]
})
export class BankBranchsModule {}
