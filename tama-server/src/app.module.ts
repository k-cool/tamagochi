import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PetModule } from './pet/pet.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { TranslateModule } from './translate/translate.module';
import { ChatModule } from './chat/chat.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      // .env 파일에 들어가야할 변수들을 정의
      validationSchema: Joi.object({
        MONGO_HOST: Joi.string().required(),
        BE_PORT: Joi.number().required(),
        MONGO_PASSWORD: Joi.string().required(),
        PAPAGO_CLIENT_ID: Joi.string().required(),
        PAPAGO_CLIENT_SECRET: Joi.string().required(),
        OPENAI_API_KEY: Joi.string().required(),
      }),
    }),
    MongooseModule.forRoot(`mongodb://${process.env.MONGO_HOST}`, {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASSWORD,
      dbName: process.env.MONGO_DB,
    }),
    ScheduleModule.forRoot(),
    PetModule,
    TranslateModule,
    ChatModule,
  ],
})
export class AppModule { }
