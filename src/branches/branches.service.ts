import { Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { Address } from 'src/core/addresses/entities/address.entity';
import { BaseService } from 'src/shared/services/base.service';

@Injectable()
export class BranchesService extends BaseService<Branch> {
  constructor(
    @InjectRepository(Branch) protected readonly repository: Repository<Branch>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {
    super(repository);
  }

  getSearchCondition(search: string | undefined): FindOptionsWhere<Branch>[] {
    const where: FindOptionsWhere<Branch>[] = [];
    if (search) {
      const ilike = ILike(`%${search}%`);
      where.push({ name: ilike });
    }
    return where;
  }

  async create(createBranchDto: CreateBranchDto): Promise<Branch> {
    const record = this.repository.create(createBranchDto);
    record.addresses = [];
    createBranchDto.addresses?.forEach((address) => {
      record.addresses?.push(this.addressRepository.create(address));
    });
    return await this.repository.save(record);
  }
}
