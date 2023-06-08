import { Module } from '@nestjs/common';
import { CatsController } from './cat.controller';
import { CatsService } from './cat.service';
import { catsProviders } from './cat.provider';
import { DatabaseModule } from '../database/db.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CatsController],
  providers: [CatsService, ...catsProviders],
})
export class CatsModule {}
