import { Injectable } from '@nestjs/common';
import { Address } from './entities/address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Raw, Repository } from 'typeorm';
import { BaseService } from 'src/shared/services/base.service';

@Injectable()
export class AddressesService extends BaseService<Address> {
  constructor(
    @InjectRepository(Address)
    protected readonly repository: Repository<Address>,
  ) {
    super(repository);
  }

  getSearchCondition(search: string | undefined): FindOptionsWhere<Address>[] {
    const where: FindOptionsWhere<Address>[] = [];
    if (search) {
      const ilike = ILike(`%${search}%`);
      where.push({ street: ilike });
      where.push({ complement: ilike });
      where.push({ district: ilike });
      where.push({ type: Raw((alias) => `${alias} ilike %${search}%`) });
      where.push({ city: { name: ilike } });
      where.push({ city: { state: { acronym: ilike } } });
      where.push({ city: { state: { name: ilike } } });
    }
    return where;
  }
}
