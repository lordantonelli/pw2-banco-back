import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { AddressType } from '../entities/address.entity';
import { RelationEntityDto } from 'src/shared/dto/relation-entity.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { City } from 'src/core/cities/entities/city.entity';
import { Exists } from 'src/shared/decorators/exists.decorator';

export class CreateAddressDto {
  @ApiProperty({ description: 'Street name of the address' })
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  street: string;

  @ApiPropertyOptional({ description: 'House or building number' })
  @IsOptional()
  @IsInt()
  number?: number;

  @ApiPropertyOptional({ description: 'Additional address details' })
  @IsOptional()
  @IsString()
  complement?: string;

  @ApiProperty({ description: 'District or neighborhood' })
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  district: string;

  @ApiProperty({ description: 'Postal code of the address' })
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  zipcode: string;

  @ApiProperty({
    description: 'Type of the address',
    enum: AddressType,
    example: AddressType.RESIDENTIAL,
  })
  @IsEnum(AddressType)
  @IsNotEmpty()
  type: AddressType;

  @ApiProperty({
    description: 'City associated with the address',
    type: () => RelationEntityDto,
  })
  @ValidateNested()
  @Type(() => RelationEntityDto)
  @IsObject()
  @IsDefined()
  @IsNotEmptyObject()
  @Exists(City)
  city: City;
}
