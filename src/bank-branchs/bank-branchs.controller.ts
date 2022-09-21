import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';

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
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Query('search') search: string,
  ) {
    return this.bankBranchsService.findAll({ page, limit }, search);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bankBranchsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBankBranchDto: UpdateBankBranchDto) {
    return this.bankBranchsService.update(id, updateBankBranchDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bankBranchsService.remove(id);
  }
}
