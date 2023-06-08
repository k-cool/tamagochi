import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Pet } from './pet.type';
import { CreatePetDTO } from './dto/create-pet.dto';
import { Cron } from '@nestjs/schedule';
import { GrowthStage } from 'src/types/status.type';

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

  @Cron('*/5 * * * * *', {})
  async checkGrowth() {
    const [pet] = await this.getPet();
    console.log('before', pet);

    await this.petModel.updateOne(
      { _id: pet._id },
      { growthStage: this.grow(pet.growthStage) },
    );
  }

  grow(current: GrowthStage): GrowthStage {
    switch (current) {
      case '알':
        return '유년기';
      case '유년기':
        return '청소년기';
      case '청소년기':
        return '성년기';
      case '성년기':
        return '사망';
      case '사망':
        return '사망';
      default:
        return '알';
    }
  }
}
