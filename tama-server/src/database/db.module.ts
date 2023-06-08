import { Module } from '@nestjs/common';
import { databaseProviders } from './db.providor';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
