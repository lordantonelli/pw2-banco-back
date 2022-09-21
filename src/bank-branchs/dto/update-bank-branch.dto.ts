import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional } from 'class-validator';

import { CreateBankBranchDto } from './create-bank-branch.dto';

export class UpdateBankBranchDto extends PartialType(CreateBankBranchDto) {
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
