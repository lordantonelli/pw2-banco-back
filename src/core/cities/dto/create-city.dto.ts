import {
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { State } from 'src/core/states/entities/state.entity';
import { RelationEntityDto } from 'src/shared/dto/relation-entity.dto';
import { IsUnique } from 'src/shared/decorators/is-unique.decorator';
import { City } from '../entities/city.entity';
import { Exists } from 'src/shared/decorators/exists.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
  @ApiProperty({ description: 'Name of the city' })
  @IsString()
  @Length(2, 255)
  @IsUnique(City, ({ name, state }: CreateCityDto) => ({ name, state }))
  name: string;

  @ApiProperty({
    description: 'State associated with the city',
    type: () => RelationEntityDto,
  })
  @ValidateNested()
  @Type(() => RelationEntityDto)
  @IsObject()
  @IsDefined()
  @IsNotEmptyObject()
  @IsUnique(City, ({ name, state }: CreateCityDto) => ({ name, state }))
  @Exists(State)
  state: State;
}
