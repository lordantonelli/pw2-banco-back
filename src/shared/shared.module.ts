/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { IsUniqueConstraint } from './validators/is-unique.constraint';
import { ExistsConstraint } from './validators/exists.constraint';

@Module({
  imports: [],
  controllers: [],
  providers: [IsUniqueConstraint, ExistsConstraint],
  exports: [IsUniqueConstraint, ExistsConstraint],
})
export class SharedModule {}
