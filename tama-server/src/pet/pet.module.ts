import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PetController } from './pet.controller';
import { PetService } from './pet.service';
import { Pet, PetSchema } from './schema/pet.schema';
import { Status, StatusSchema } from './schema/status.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pet.name, schema: PetSchema },
      { name: Status.name, schema: StatusSchema },
    ]),
  ],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
