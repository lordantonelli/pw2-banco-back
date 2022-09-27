import { BaseEntity } from '@shared/entities';
import { Column, Entity } from 'typeorm';

@Entity()
export class BankBranch extends BaseEntity {
  @Column({ length: 255 })
  name: string;

  @Column({ type: 'int', unique: true })
  code: number;

  @Column()
  isActive: boolean;
}
