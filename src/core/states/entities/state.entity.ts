import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class State extends BaseEntity {
  @ApiProperty({ description: 'Name of the state' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ description: 'Acronym of the state' })
  @Column({ unique: true, length: 2 })
  acronym: string;
}
