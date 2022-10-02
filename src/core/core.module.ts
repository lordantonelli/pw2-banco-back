import { Module } from '@nestjs/common';

import { StatesModule } from './states/states.module';

@Module({
  imports: [StatesModule],
})
export class CoreModule {}
