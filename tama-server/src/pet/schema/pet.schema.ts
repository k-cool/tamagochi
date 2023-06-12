import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { Status } from './status.schema';

export type PetDocument = mongoose.HydratedDocument<Pet>;

@Schema({ timestamps: true, versionKey: false })
export class Pet {
  @Prop({ type: String, default: uuid })
  _id: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Date, default: new Date() })
  lastFeed: Date;

  @Prop({ type: String, default: uuid, ref: 'Status' })
  status: Status;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
