import { PartialType } from '@nestjs/mapped-types';
import { CreateBankBranchDto } from './create-bank-branch.dto';

export class UpdateBankBranchDto extends PartialType(CreateBankBranchDto) {}
