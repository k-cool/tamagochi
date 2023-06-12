import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Stage } from '../types/status.type';

export type StatusDocument = mongoose.HydratedDocument<Status>;

@Schema({ timestamps: true, versionKey: false })
export class Status {
  @Prop({ type: String, default: uuid })
  _id: string;

  @Prop({ type: Number, default: 1 })
  age: number;

  @Prop({
    type: String,
    enum: ['알', '유년기', '청소년기', '성년기', '사망'],
    default: '알',
  })
  stage: Stage;
}

export const StatusSchema = SchemaFactory.createForClass(Status);
