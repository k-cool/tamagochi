import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
import { SATIETY } from '../constant';

export type StatusDocument = mongoose.HydratedDocument<Status>;

@Schema({ timestamps: true, versionKey: false })
export class Status {
  @Prop({ type: String, default: uuid })
  _id: string;

  @Prop({ type: Number, default: 1 })
  age: number;

  @Prop({
    type: Number,
    default: SATIETY.DEFAULT_SATIETY,
    min: SATIETY.MIN_SATIETY,
    max: SATIETY.MAX_SATIETY,
  })
  satiety: number;

  @Prop({
    type: Number,
    default: SATIETY.DEFAULT_SATIETY,
    min: SATIETY.MIN_SATIETY,
    max: SATIETY.MAX_SATIETY,
  })
  cleanliness: number;
}

export const StatusSchema = SchemaFactory.createForClass(Status);
