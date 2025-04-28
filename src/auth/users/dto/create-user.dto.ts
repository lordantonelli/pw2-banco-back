import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsUnique } from 'src/shared/decorators/is-unique.decorator';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ description: 'Name of the user' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Email of the user' })
  @IsEmail()
  @IsUnique(User)
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    minLength: 4,
    maxLength: 20,
    example: 'StrongP@ssword1',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
