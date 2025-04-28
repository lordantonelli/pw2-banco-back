import { ApiProperty } from '@nestjs/swagger';
import { Address } from 'src/core/addresses/entities/address.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Branch extends BaseEntity {
  @ApiProperty({ description: 'Name of the branch' })
  @Column({ length: 255 })
  name: string;

  @ApiProperty({ description: 'Unique code of the branch' })
  @Column({ type: 'int', unique: true })
  code: number;

  @ApiProperty({
    description: 'Indicates if the branch is active',
  })
  @Column()
  isActive: boolean;

  @ApiProperty({
    description: 'List of addresses associated with the branch',
    type: () => [Address],
  })
  @ManyToMany(() => Address, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinTable({ name: 'branch_addresses' })
  addresses?: Address[];
}
