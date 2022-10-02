import { BaseEntity } from '@shared/entities';
import { Column, Entity } from 'typeorm';

@Entity()
export class State extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true, length: 2 })
  acronym: string;
}
