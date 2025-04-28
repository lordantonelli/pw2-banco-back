import { Module } from '@nestjs/common';
import { StatesModule } from './states/states.module';
import { CitiesModule } from './cities/cities.module';
import { AddressesModule } from './addresses/addresses.module';

@Module({
  imports: [StatesModule, CitiesModule, AddressesModule]
})
export class CoreModule {}
