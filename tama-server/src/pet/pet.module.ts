import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/db.module';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';
import { petProviders } from './pet.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [PetController],
  providers: [PetService, ...petProviders],
})
export class PetModule {}
