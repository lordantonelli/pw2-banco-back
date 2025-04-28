import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Account } from './account.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Transaction extends BaseEntity {
  @ApiProperty({
    description: 'Account associated with the transaction',
    type: () => Account,
  })
  @ManyToOne(() => Account)
  account: Account;

  @ApiProperty({
    description: 'Description of the transaction',
    example: 'Deposit',
  })
  @Column()
  description: string;

  @ApiProperty({ description: 'Value of the transaction', example: 100.5 })
  @Column('double precision')
  value: number;
}
