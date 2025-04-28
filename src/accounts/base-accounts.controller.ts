import {
  Body,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { QueryListDto } from 'src/shared/dto/query-list.dto';
import { AccountsService } from './accounts.service';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { User } from 'src/auth/users/entities/user.entity';
import { MovingAccountDto } from './dto/moving-account.dto';
import { MovingTransferAccountDto } from './dto/moving-transfer-account.dto';

export abstract class BaseAccountsController<Service extends AccountsService> {
  constructor(protected readonly service: Service) {}

  @Get()
  findAll(@Query() query: QueryListDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Post(':id/credit')
  credit(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
    @Body() movingAccountDto: MovingAccountDto,
  ) {
    return this.service.credit(id, user, movingAccountDto);
  }

  @Post(':id/debit')
  debit(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
    @Body() movingAccountDto: MovingAccountDto,
  ) {
    return this.service.debit(id, user, movingAccountDto);
  }

  @Post(':id/transfer')
  transfer(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
    @Body() movingTransferAccountDto: MovingTransferAccountDto,
  ) {
    return this.service.transfer(id, user, movingTransferAccountDto);
  }
}
