import { Injectable } from '@nestjs/common';
import { City } from './entities/city.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/shared/services/base.service';

@Injectable()
export class CitiesService extends BaseService<City> {
  constructor(
    @InjectRepository(City) protected readonly repository: Repository<City>,
  ) {
    super(repository);
  }

  getSearchCondition(search: string | undefined): FindOptionsWhere<City>[] {
    const where: FindOptionsWhere<City>[] = [];
    if (search) {
      const ilike = ILike(`%${search}%`);
      where.push({ name: ilike });
      where.push({ state: { name: ilike } });
      where.push({ state: { acronym: ilike } });
    }
    return where;
  }
}
