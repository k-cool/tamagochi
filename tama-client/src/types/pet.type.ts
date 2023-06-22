import { GrowthStage } from "./dusty.type";

export interface Pet {
  _id?: string;
  name: string;
  growthStage: GrowthStage;
  createdAt?: Date;
  updatedAt?: Date;
}
