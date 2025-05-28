import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/shared/services/base.service';
import { User } from './entities/user.entity';
import { DeepPartial, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectRepository(User) protected readonly repository: Repository<User>,
  ) {
    super(repository);
  }

  async create(createDto: DeepPartial<User>): Promise<User> {
    const record = this.repository.create(createDto);
    const user = await this.repository.save(record);
    delete user.password; // Remove password from the response
    return user;
  }

  getSearchCondition(search: string | undefined): FindOptionsWhere<User>[] {
    const where: FindOptionsWhere<User>[] = [];
    if (search) {
      const ilike = ILike(`%${search}%`);
      where.push({ name: ilike });
    }
    return where;
  }

  async findByEmail(
    email: string,
    includePassowrd: boolean = false,
  ): Promise<User | null> {
    const user = await this.repository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (user && !includePassowrd) {
      delete user?.password; // Remove password from the response
    }

    return user;
  }
}
