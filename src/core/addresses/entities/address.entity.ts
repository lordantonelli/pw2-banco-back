import { BaseEntity } from 'src/shared/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';

import { City } from 'src/core/cities/entities/city.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum AddressType {
  RESIDENTIAL = 'Residencial',
  BUSINESS = 'Comercial',
  FAMILY = 'Família',
  MAILING = 'Correspondência',
  OTHER = 'Outro',
}

@Entity()
export class Address extends BaseEntity {
  @ApiProperty({ description: 'Street name of the address' })
  @Column()
  street: string;

  @ApiProperty({ description: 'House or building number', nullable: true })
  @Column({ nullable: true })
  number: number;

  @ApiProperty({ description: 'Additional address details', nullable: true })
  @Column({ nullable: true })
  complement: string;

  @ApiProperty({ description: 'District or neighborhood' })
  @Column()
  district: string;

  @ApiProperty({ description: 'Postal code of the address' })
  @Column()
  zipcode: string;

  @ApiProperty({
    description: 'City associated with the address',
    type: () => City,
  })
  @ManyToOne(() => City, { eager: true })
  city: City;

  @ApiProperty({
    description: 'Type of the address',
    enum: AddressType,
    example: AddressType.RESIDENTIAL,
  })
  @Column({
    type: 'varchar',
    enum: AddressType,
    default: AddressType.RESIDENTIAL,
  })
  type: AddressType;
}
