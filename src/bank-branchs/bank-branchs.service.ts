import { RecordNotFoundException } from '@exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';

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

  findAll(options: IPaginationOptions, search?: string): Promise<Pagination<BankBranch>> {
    const where: FindOptionsWhere<BankBranch> = {};
    if (search) {
      where.name = ILike(`%${search}%`);
    }

    return paginate<BankBranch>(this.repository, options, { where });
  }

  async findOne(id: number): Promise<BankBranch> {
    const bankBranch = await this.repository.findOneBy({ id });

    if (!bankBranch) {
      throw new RecordNotFoundException();
    }

    return bankBranch;
  }

  async update(id: number, updateBankBranchDto: UpdateBankBranchDto): Promise<BankBranch> {
    await this.repository.update(id, updateBankBranchDto);
    const bankBranch = await this.repository.findOneBy({ id });
    if (!bankBranch) {
      throw new RecordNotFoundException();
    }

    return bankBranch;
  }

  async remove(id: number): Promise<boolean> {
    const bankBranch = await this.repository.delete(id);

    if (!bankBranch?.affected) {
      throw new RecordNotFoundException();
    }

    return true;
  }
}
