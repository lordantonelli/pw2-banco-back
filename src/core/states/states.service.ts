import { Injectable } from '@nestjs/common';
import { State } from './entities/state.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { BaseService } from 'src/shared/services/base.service';

@Injectable()
export class StatesService extends BaseService<State> {
  constructor(
    @InjectRepository(State) protected readonly repository: Repository<State>,
  ) {
    super(repository);
  }

  getSearchCondition(search: string | undefined): FindOptionsWhere<State>[] {
    const where: FindOptionsWhere<State>[] = [];
    if (search) {
      const ilike = ILike(`%${search}%`);
      where.push({ name: ilike });
      where.push({ acronym: ilike });
    }
    return where;
  }
}
