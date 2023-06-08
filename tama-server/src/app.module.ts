import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CatsModule } from './cat/cat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CatsModule,
  ],
})
export class AppModule {}
