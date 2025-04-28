import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';
import { User } from 'src/auth/users/entities/user.entity';
import { Branch } from 'src/branches/entities/branch.entity';
import { Exists } from 'src/shared/decorators/exists.decorator';
import { RelationEntityDto } from 'src/shared/dto/relation-entity.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty({ type: () => RelationEntityDto })
  @ValidateNested()
  @Type(() => RelationEntityDto)
  @IsObject()
  @IsDefined()
  @IsNotEmptyObject()
  @Exists(Branch)
  branch: Branch;

  @ApiProperty({ type: () => RelationEntityDto })
  @ValidateNested()
  @Type(() => RelationEntityDto)
  @IsObject()
  @IsDefined()
  @IsNotEmptyObject()
  @Exists(User)
  user: User;

  @ApiPropertyOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsOptional()
  balance?: number;
}
