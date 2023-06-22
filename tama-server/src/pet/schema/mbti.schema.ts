import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
import { MBTIENUM } from '../constant';

export type StatusDocument = mongoose.HydratedDocument<MBTI>;

@Schema({ timestamps: true, versionKey: false })
export class MBTI {
    @Prop({ type: String, default: uuid })
    _id: string;

    @Prop({
        type: Number,
        default: MBTIENUM.DEFAULT_MBTI,
        min: MBTIENUM.MIN_MBTI,
        max: MBTIENUM.MAX_MBTI
    })
    IE: number;

    @Prop({
        type: Number,
        default: MBTIENUM.DEFAULT_MBTI,
        min: MBTIENUM.MIN_MBTI,
        max: MBTIENUM.MAX_MBTI
    })
    NS: number;

    @Prop({
        type: Number,
        default: MBTIENUM.DEFAULT_MBTI,
        min: MBTIENUM.MIN_MBTI,
        max: MBTIENUM.MAX_MBTI
    })
    FT: number;

    @Prop({
        type: Number,
        default: MBTIENUM.DEFAULT_MBTI,
        min: MBTIENUM.MIN_MBTI,
        max: MBTIENUM.MAX_MBTI
    })
    PJ: number;
}

export const MBTISchema = SchemaFactory.createForClass(MBTI);