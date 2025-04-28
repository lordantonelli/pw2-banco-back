import { Module } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { BranchesController } from './branches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { AddressesModule } from 'src/core/addresses/addresses.module';

@Module({
  imports: [TypeOrmModule.forFeature([Branch]), AddressesModule],
  controllers: [BranchesController],
  providers: [BranchesService],
})
export class BranchesModule {}
