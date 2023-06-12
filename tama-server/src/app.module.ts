import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PetModule } from './pet/pet.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(`mongodb://${process.env.MONGO_HOST}`, {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASSWORD,
      dbName: process.env.MONGO_DB,
    }),
    ScheduleModule.forRoot(),
    PetModule,
  ],
})
export class AppModule {}
