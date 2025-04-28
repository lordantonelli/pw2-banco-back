import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User extends BaseEntity {
  @ApiProperty({ description: 'Name of the user', example: 'John Doe' })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'john.doe@example.com',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'StrongP@ssword1',
    writeOnly: true,
  })
  @Column({ select: false })
  password?: string;
}
