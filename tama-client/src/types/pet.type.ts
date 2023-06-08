import { GrowthStage } from "./status.type";

export interface Pet {
  _id?: string;
  name: string;
  growthStage: GrowthStage;
  createdAt?: Date;
  updatedAt?: Date;
}
