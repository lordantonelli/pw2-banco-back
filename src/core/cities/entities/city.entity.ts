import { State } from 'src/core/states/entities/state.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Index(['name', 'state'], { unique: true })
export class City extends BaseEntity {
  @ApiProperty({ description: 'Name of the city' })
  @Column()
  name: string;

  @ApiProperty({
    description: 'State associated with the city',
    type: () => State,
  })
  @ManyToOne(() => State, { eager: true })
  state: State;
}
