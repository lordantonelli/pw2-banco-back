import { RecordNotFoundException } from '@exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    let user = this.repository.create(createUserDto);
    user = await this.repository.save(user);
    user.password = null;
    return user;
  }

  findAll(options: IPaginationOptions, search?: string): Promise<Pagination<User>> {
    const where: FindOptionsWhere<User> = {};
    if (search) {
      where.name = ILike(`%${search}%`);
    }

    return paginate<User>(this.repository, options, { where });
  }

  async findOne(id: number): Promise<User> {
    const bankBranch = await this.repository.findOneBy({ id });

    if (!bankBranch) {
      throw new RecordNotFoundException();
    }

    return bankBranch;
  }

  async findByEmail(email: string): Promise<User> {
    const bankBranch = await this.repository.findOneBy({ email });

    if (!bankBranch) {
      throw new RecordNotFoundException();
    }

    return bankBranch;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.repository.update(id, updateUserDto);
    const user = await this.repository.findOneBy({ id });
    if (!user) {
      throw new RecordNotFoundException();
    }

    return user;
  }

  async remove(id: number): Promise<boolean> {
    const user = await this.repository.delete(id);

    if (!user?.affected) {
      throw new RecordNotFoundException();
    }

    return true;
  }
}
