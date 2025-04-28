import { IsString, IsUppercase, Length } from 'class-validator';
import { IsUnique } from 'src/shared/decorators/is-unique.decorator';
import { State } from '../entities/state.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStateDto {
  @ApiProperty({ description: 'Name of the state' })
  @IsString()
  @Length(2, 255)
  @IsUnique(State)
  name: string;

  @ApiProperty({ description: 'Acronym of the state' })
  @IsString()
  @Length(2, 2)
  @IsUppercase()
  @IsUnique(State)
  acronym: string;
}
