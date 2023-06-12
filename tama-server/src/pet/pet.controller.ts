import { Body, Controller, Get, Post } from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDTO } from './dto/create-pet.dto';
import { Pet } from './schema/pet.schema';

@Controller('pet')
export class PetController {
  constructor(private petService: PetService) {}

  @Post()
  async createPet(@Body() createPetDTO: CreatePetDTO): Promise<Pet> {
    return await this.petService.createPet(createPetDTO);
  }

  @Get()
  async getPet(): Promise<Pet[]> {
    return await this.petService.getPetList();
  }
}
