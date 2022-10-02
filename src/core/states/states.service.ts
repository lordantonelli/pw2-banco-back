import { RecordNotFoundException } from '@exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { FindManyOptions, ILike, Repository } from 'typeorm';

import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { State } from './entities/state.entity';

@Injectable()
export class StatesService {
  constructor(@InjectRepository(State) private repository: Repository<State>) {}

  async create(createStateDto: CreateStateDto): Promise<State> {
    const state = this.repository.create(createStateDto);
    return await this.repository.save(state);
  }

  findAll(options: IPaginationOptions, search?: string): Promise<Pagination<State>> {
    const where: FindManyOptions<State> = {};
    if (search) {
      where.where = [{ name: ILike(`%${search}%`) }, { acronym: ILike(`%${search}%`) }];
    }

    return paginate<State>(this.repository, options, where);
  }

  async findOne(id: number): Promise<State> {
    const state = await this.repository.findOneBy({ id });

    if (!state) {
      throw new RecordNotFoundException();
    }

    return state;
  }

  async update(id: number, updateStateDto: UpdateStateDto): Promise<State> {
    await this.repository.update(id, updateStateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const user = await this.repository.delete(id);

    if (!user?.affected) {
      throw new RecordNotFoundException();
    }

    return true;
  }
}
