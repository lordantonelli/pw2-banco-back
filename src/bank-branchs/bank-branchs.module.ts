import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BankBranchsController } from './bank-branchs.controller';
import { BankBranchsService } from './bank-branchs.service';
import { BankBranch } from './entities/bank-branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BankBranch])],
  controllers: [BankBranchsController],
  providers: [BankBranchsService],
})
export class BankBranchsModule {}
