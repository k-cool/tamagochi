import * as mongoose from 'mongoose';
import { Pet } from './pet.type';

export const PetSchema = new mongoose.Schema<Pet>(
  {
    name: { type: String, required: true },
    growthStage: {
      type: String,
      enum: ['알', '유년기', '청소년기', '성년기', '사망'],
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);
