import { Injectable } from '@nestjs/common';

import { CreateBankBranchDto } from './dto/create-bank-branch.dto';
import { UpdateBankBranchDto } from './dto/update-bank-branch.dto';
import { BankBranch } from './entities/bank-branch.entity';

@Injectable()
export class BankBranchsService {
  create(createBankBranchDto: CreateBankBranchDto): Promise<BankBranch> {
    const bankBranch: BankBranch = new BankBranch();
    bankBranch.name = createBankBranchDto.name;
    bankBranch.code = createBankBranchDto.code;
    bankBranch.isActive = true;

    return bankBranch.save();
  }

  findAll() {
    return `This action returns all bankBranchs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bankBranch`;
  }

  update(id: number, updateBankBranchDto: UpdateBankBranchDto) {
    return `This action updates a #${id} bankBranch`;
  }

  remove(id: number) {
    return `This action removes a #${id} bankBranch`;
  }
}