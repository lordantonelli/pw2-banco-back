import { RecordNotFoundException } from '@exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBankBranchDto } from './dto/create-bank-branch.dto';
import { UpdateBankBranchDto } from './dto/update-bank-branch.dto';
import { BankBranch } from './entities/bank-branch.entity';

@Injectable()
export class BankBranchsService {
  constructor(@InjectRepository(BankBranch) private repository: Repository<BankBranch>) {}

  create(createBankBranchDto: CreateBankBranchDto): Promise<BankBranch> {
    const bankBranch: BankBranch = new BankBranch();
    bankBranch.name = createBankBranchDto.name;
    bankBranch.code = createBankBranchDto.code;
    bankBranch.isActive = true;

    return this.repository.save(bankBranch);
  }

  findAll() {
    return `This action returns all bankBranchs`;
  }

  async findOne(id: number): Promise<BankBranch> {
    const bankBranch = await this.repository.findOneBy({ id });

    if (!bankBranch) {
      throw new RecordNotFoundException();
    }

    return bankBranch;
  }

  update(id: number, updateBankBranchDto: UpdateBankBranchDto) {
    return `This action updates a #${id} bankBranch`;
  }

  async remove(id: number): Promise<boolean> {
    const bankBranch = await this.repository.delete(id);

    if (!bankBranch?.affected) {
      throw new RecordNotFoundException();
    }

    return true;
  }
}
