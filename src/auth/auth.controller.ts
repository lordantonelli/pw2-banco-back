import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from './users/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/shared/decorators/is-public.decorator';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { ApiPaginatedResponse } from 'src/shared/decorators/api-paginated-response.decorator';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  login(@CurrentUser() user: User) {
    return this.authService.login(user);
  }

  @ApiPaginatedResponse(User)
  @Get('me')
  me(@CurrentUser() user: User) {
    return user;
  }
}
