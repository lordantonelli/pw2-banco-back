import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class RelationEntityDto {
  @ApiProperty({ description: 'Unique identifier of the related entity' })
  @IsInt()
  @IsPositive()
  id: number;
}
