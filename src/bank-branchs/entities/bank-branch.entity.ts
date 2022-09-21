import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class BankBranch extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'int', unique: true })
  code: number;

  @Column()
  isActive: boolean;

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  lastUpdated: Date;
}
