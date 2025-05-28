import { SharedModule } from './shared/shared.module';
import { Module } from '@nestjs/common';
import { BranchesModule } from './branches/branches.module';
import { CoreModule } from './core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SharedModule,
    BranchesModule,
    CoreModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database/bank.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    AccountsModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}
