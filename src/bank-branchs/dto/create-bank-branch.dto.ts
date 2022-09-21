import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreateBankBranchDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsInt()
  @IsPositive()
  @Min(1)
  code: number;
}
