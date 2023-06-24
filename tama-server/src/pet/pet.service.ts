import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreatePetDTO } from './dto/create-pet.dto';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Pet } from './schema/pet.schema';
import { Status } from './schema/status.schema';
import { CLEANLINESS, MBTIENUM, SATIETY } from './constant';
import { UpdateMBTIDto } from './dto/update-mbti.dto';
import { MBTI } from './schema/mbti.schema';

@Injectable()
export class PetService {
  constructor(
    @InjectModel(Pet.name) private petModel: Model<Pet>,
    @InjectModel(Status.name) private statusModel: Model<Status>,
    @InjectModel(MBTI.name) private mbtiModel: Model<MBTI>,
  ) { }

  //pet 생성
  async createPet(createPetDTO: CreatePetDTO): Promise<Pet> {
    const { name } = createPetDTO;

    const status = new this.statusModel();
    await status.save();

    const mbti = new this.mbtiModel();
    await mbti.save();

    const pet = new this.petModel({ name, status: status._id, mbti: mbti._id });
    return await pet.save();
  }

  //pet list 가져오기
  async getPetList(): Promise<Pet[]> {
    return await this.petModel.find().populate('status').populate('mbti');
  }

  // petId로 pet 상태 가져오기
  async getPetStatus(petId: string): Promise<Status> {
    const { status } = await this.petModel
      .findOne({ _id: petId })
      .populate('status');
    return status;
  }

  async getPetMbti(petId: string): Promise<MBTI> {
    const { mbti } = await this.petModel
      .findOne({ _id: petId })
      .populate('mbti');
    return mbti;
  }

  //pet 먹이 주기
  async feedPet(petId: string): Promise<void> {
    const status = await this.getPetStatus(petId);

    const satiety = SATIETY.SATIETY_SET_FEED; //100 (하루에 한번으로 먹이 주기를 제한하므로 한번 주면 100으로 설정하도록 바꿈)
    await this.statusModel.updateOne(
      { _id: status._id },
      { $set: { satiety } },
      { runValidators: true },
    );
    await this.petModel.updateOne(
      { _id: petId },
      { $set: { lastFeed: new Date() } },
    );
  }

  // 펫 씻기기
  async cleanPet(petId: string): Promise<void> {
    const status = await this.getPetStatus(petId);

    const cleanliness = CLEANLINESS.CLEANLINESS_PER_CLEAN; //100

    await this.statusModel.updateOne(
      { _id: status._id },
      { $set: { cleanliness } },
      { runValidators: true },
    );
  }

  async updateMBTI(updateMBTIDto: UpdateMBTIDto): Promise<void> {
    const mbti = await this.getPetMbti(updateMBTIDto.petId);
    const MBTIType = updateMBTIDto.MBTIType;
    const calculatedData = mbti[MBTIType] + Number(updateMBTIDto.variableValue);

    let changed: number;
    if (calculatedData > 100) {
      changed = 100;
    } else if (calculatedData < 0) {
      changed = 0;
    } else {
      changed = calculatedData
    }
    await this.mbtiModel.updateOne(
      { _id: mbti._id },
      { $set: { [MBTIType]: changed } },
      { runValidators: true },
    );
  }

  // 펫 나이 증가
  @Cron('0 0 0 * * *', {})
  async incPetAge() {
    const statusList = await this.statusModel.find();

    const promises = statusList.map(async (status) => {
      await this.statusModel.updateOne(
        { _id: status._id },
        { $inc: { age: +1 } },
      );
    })

    await Promise.all(promises);
  };

  // 청결도, 배고픔 유지 => MBTI적용을 위해 다만 반복 시간은 추후 줄일 것
  @Cron('*/5 * * * * *', {})
  async checkSatiety() {
    const statusList = await this.statusModel.find();

    const promises = statusList.map(async (status) => {
      if (status.satiety > 0) {
        await this.statusModel.updateOne(
          { _id: status._id },
          { $inc: { satiety: -1 } },
        );
      } else {
        // 0으로 설정 => if문 배고픔 정도 조건 추후 점검
      }

      // 청결도 조건
      if (status.cleanliness > 0) {
        await this.statusModel.updateOne(
          { _id: status._id },
          { $inc: { cleanliness: -1 } },
        );
      } else {

      }
    });

    await Promise.all(promises);
  }
}
