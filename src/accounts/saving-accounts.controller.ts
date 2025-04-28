import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SavingAccountsService } from './saving-accounts.service';
import { BaseAccountsController } from './base-accounts.controller';
import { CreateAccountDto } from './dto/create-account.dto';

@ApiTags('saving-accounts')
@Controller('accounts/saving')
export class SavingAccountsController extends BaseAccountsController<SavingAccountsService> {
  constructor(protected readonly service: SavingAccountsService) {
    super(service);
  }

  @Post()
  create(@Body() createDto: CreateAccountDto) {
    return this.service.create(createDto);
  }
}
