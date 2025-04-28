import {
  Repository,
  FindOptionsWhere,
  ObjectLiteral,
  DeepPartial,
} from 'typeorm';
import { RecordNotFoundException } from 'src/exceptions/record-not-found.exception';
import { Pagination } from 'nestjs-typeorm-paginate';
import { RepositoryUtils } from '../utils/repository.utils';
import { QueryListDto } from '../dto/query-list.dto';

export abstract class BaseService<Entity extends ObjectLiteral> {
  private readonly primaryColumnName: string;

  constructor(protected readonly repository: Repository<Entity>) {
    const primaryColumns = this.repository.metadata.primaryColumns;
    if (primaryColumns.length === 0) {
      throw new Error('Entity does not have a primary column defined');
    }
    this.primaryColumnName = primaryColumns[0].propertyName;
  }

  async create(createDto: DeepPartial<Entity>): Promise<Entity> {
    const record = this.repository.create(createDto);
    return await this.repository.save(record);
  }

  abstract getSearchCondition(
    search: string | undefined,
  ): FindOptionsWhere<Entity>[];

  async findAll(query: QueryListDto): Promise<Pagination<Entity>> {
    return RepositoryUtils.findAllWithPagination(
      this.repository,
      query,
      this.getSearchCondition(query.search) ?? [],
    );
  }

  async findOne(id: number): Promise<Entity> {
    const where = { [this.primaryColumnName]: id } as FindOptionsWhere<Entity>;
    const record = await this.repository.findOne({ where });
    if (!record) throw new RecordNotFoundException();
    return record;
  }

  async update(id: number, updateDto: Partial<Entity>): Promise<Entity> {
    await this.repository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) throw new RecordNotFoundException();
  }
}
