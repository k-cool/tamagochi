import { Body, Controller, Get, Param, Post, ParseUUIDPipe, UsePipes } from '@nestjs/common';
import { PetService } from './pet.service';
import { CreatePetDTO, createPetSchema } from './dto/create-pet.dto';
import { Pet } from './schema/pet.schema';
import { Status } from './schema/status.schema';
import { UpdateMBTIDto } from './dto/update-mbti.dto';
import { JoiValidationPipe } from './pipes/joi.validation.pipe';
import { ValidationPipe } from './pipes/validation.pipe';

@Controller('pet')
export class PetController {
  constructor(private petService: PetService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createPetSchema))
  async createPet(@Body() createPetDTO: CreatePetDTO): Promise<Pet> {
    return await this.petService.createPet(createPetDTO);
  }

  @Get()
  async getPet(): Promise<Pet[]> {
    return await this.petService.getPetList();
  }

  @Get('/feed/:id')
  async feedPet(@Param('id', new ParseUUIDPipe()) petId: string): Promise<void> {
    return await this.petService.feedPet(petId);
  }

  @Get('/clean/:id')
  async cleanPet(@Param('id', new ParseUUIDPipe()) petId: string): Promise<void> {
    return await this.petService.cleanPet(petId);
  }

  @Get('/petStatus/:id')
  async getPetStatus(@Param('id', new ParseUUIDPipe()) petId: string): Promise<Status>{
    return await this.petService.getPetStatus(petId);
  }

  @Post('/MBTI')
  async updateMBTI(@Body(new ValidationPipe()) updateMBTIDto: UpdateMBTIDto): Promise<void> {
    return await this.petService.updateMBTI(updateMBTIDto);
  }
}
