import { Module } from '@nestjs/common';
import { TranslateController } from './translate.controller';
import { TranslateService } from './translate.service';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [],
    controllers: [TranslateController],
    providers: [TranslateService, ConfigService],
})
export class TranslateModule {}
