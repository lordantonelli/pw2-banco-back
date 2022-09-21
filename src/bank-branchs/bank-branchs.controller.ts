import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BankBranchsService } from './bank-branchs.service';
import { CreateBankBranchDto } from './dto/create-bank-branch.dto';
import { UpdateBankBranchDto } from './dto/update-bank-branch.dto';

@Controller('bank-branchs')
export class BankBranchsController {
  constructor(private readonly bankBranchsService: BankBranchsService) {}

  @Post()
  create(@Body() createBankBranchDto: CreateBankBranchDto) {
    return this.bankBranchsService.create(createBankBranchDto);
  }

  @Get()
  findAll() {
    return this.bankBranchsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bankBranchsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBankBranchDto: UpdateBankBranchDto) {
    return this.bankBranchsService.update(+id, updateBankBranchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankBranchsService.remove(+id);
  }
}
