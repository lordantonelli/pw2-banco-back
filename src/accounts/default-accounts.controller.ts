import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { DefaultAccountsService } from './default-accounts.service';
import { BaseAccountsController } from './base-accounts.controller';
import { UpdateDefaultAccountDto } from './dto/update-default-account.dto';
import { CreateAccountDto } from './dto/create-account.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('default-accounts')
@Controller('accounts/default')
export class DefaultAccountsController extends BaseAccountsController<DefaultAccountsService> {
  constructor(protected readonly service: DefaultAccountsService) {
    super(service);
  }

  @Post()
  create(@Body() createDto: CreateAccountDto) {
    return this.service.create(createDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDefaultAccountDto: UpdateDefaultAccountDto,
  ) {
    return this.service.update(id, updateDefaultAccountDto);
  }
}
