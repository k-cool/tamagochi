import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PetModule } from './pet/pet.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
//import { Pet, PetSchema } from './pet/schema/pet.schema';
import { TranslateModule } from './translate/translate.module';

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
    // MongooseModule.forFeatureAsync([
    //   {
    //     name: Pet.name,
    //     imports: [ConfigModule],
    //     useFactory: (configService: ConfigService) => {
    //       const schema = PetSchema;
    //       schema.pre('save', function() {
    //         console.log(`${configService.get('APP_NAME')}: Hello from pre save`);
    //       });
    //       return schema;
    //     },
    //     inject: [ConfigService],
    //   },
    // ]),
    ScheduleModule.forRoot(),
    PetModule,
    TranslateModule,
  ],
})
export class AppModule {}
