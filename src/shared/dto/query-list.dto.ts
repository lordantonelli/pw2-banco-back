import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { QuerySearchDto } from './query-search.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryListDto extends QuerySearchDto implements IPaginationOptions {
  @ApiPropertyOptional({ description: 'Page number for pagination' })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  page: number = 1;

  @ApiPropertyOptional({ description: 'Number of items per page' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  limit: number = 25;
}
