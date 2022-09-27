import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BankBranchsModule } from './bank-branchs/bank-branchs.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    BankBranchsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database/banco.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    SharedModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
