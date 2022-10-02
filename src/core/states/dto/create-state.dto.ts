import { IsString, IsUppercase, Length } from 'class-validator';

export class CreateStateDto {
  @IsString()
  name: string;

  @IsString()
  @Length(2, 2)
  @IsUppercase()
  acronym: string;
}
