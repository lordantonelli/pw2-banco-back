import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { QueryListDto } from 'src/shared/dto/query-list.dto';
import { BaseAccountsController } from './base-accounts.controller';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('accounts')
@Controller('accounts')
export class AccountsController extends BaseAccountsController<AccountsService> {
  constructor(protected readonly service: AccountsService) {
    super(service);
  }

  @Get()
  findAll(@Query() query: QueryListDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(+id);
  }
}
