import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/services/base.service';
import { User } from './entities/user.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectRepository(User) protected readonly repository: Repository<User>,
  ) {
    super(repository);
  }

  getSearchCondition(search: string | undefined): FindOptionsWhere<User>[] {
    const where: FindOptionsWhere<User>[] = [];
    if (search) {
      const ilike = ILike(`%${search}%`);
      where.push({ name: ilike });
    }
    return where;
  }
}
