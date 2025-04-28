import { IsNumber, Min } from 'class-validator';
import { CreateAccountDto } from './create-account.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDefaultAccountDto extends CreateAccountDto {
  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  limit: number;
}
