import { ChildEntity } from 'typeorm';
import { Account } from './account.entity';

@ChildEntity('Poupança')
export class SavingAccount extends Account {}
