import {
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { MovingAccountDto } from './moving-account.dto';
import { Type } from 'class-transformer';
import { Account } from '../entities/account.entity';
import { Exists } from 'src/shared/decorators/exists.decorator';
import { RelationEntityDto } from 'src/shared/dto/relation-entity.dto';
import { ApiProperty } from '@nestjs/swagger';

export class MovingTransferAccountDto extends MovingAccountDto {
  @ApiProperty({ type: () => RelationEntityDto })
  @ValidateNested()
  @Type(() => RelationEntityDto)
  @IsObject()
  @IsDefined()
  @IsNotEmptyObject()
  @Exists(Account)
  accountTo: Account;
}
