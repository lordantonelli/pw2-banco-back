import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from 'src/core/addresses/dto/create-address.dto';
import { Address } from 'src/core/addresses/entities/address.entity';

export class CreateBranchDto {
  @ApiProperty({ description: 'Name of the branch', example: 'Main Branch' })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({ description: 'Unique code of the branch', example: 101 })
  @IsInt()
  @IsPositive()
  @Min(1)
  code: number;

  @ApiPropertyOptional({
    description: 'List of addresses associated with the branch',
    type: [CreateAddressDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  @IsArray()
  @IsOptional()
  addresses?: Address[];
}
