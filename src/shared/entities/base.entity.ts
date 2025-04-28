import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @ApiProperty({ description: 'Unique identifier of the entity' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Timestamp when the entity was created',
    example: '2023-01-01T12:00:00Z',
    format: 'date-time',
  })
  @CreateDateColumn()
  dateCreated: Date;

  @ApiProperty({
    description: 'Timestamp when the entity was last updated',
    example: '2023-01-02T12:00:00Z',
    format: 'date-time',
  })
  @UpdateDateColumn()
  lastUpdated: Date;
}
