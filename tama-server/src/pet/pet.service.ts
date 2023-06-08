import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Pet } from './pet.type';
import { CreatePetDTO } from './dto/create-pet.dto';

@Injectable()
export class PetService {
  constructor(
    @Inject('PET_MODEL')
    private petModel: Model<Pet>,
  ) {}

  async createPet(createPetDTO: CreatePetDTO): Promise<Pet> {
    const { name } = createPetDTO;
    const pet = new this.petModel({ name, growthStage: '알' });
    return await pet.save();
  }

  async getPet(): Promise<Pet[]> {
    return this.petModel.find().exec();
  }
}
