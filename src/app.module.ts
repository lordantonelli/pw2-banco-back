import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BankBranchsModule } from './bank-branchs/bank-branchs.module';
import { SharedModule } from './shared/shared.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
