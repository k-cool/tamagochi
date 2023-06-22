import { Body, Controller, Get } from '@nestjs/common';
import { TranslateService } from './translate.service';

@Controller('translate')
export class TranslateController {
  constructor(
      private translateService : TranslateService
    ) {}

  @Get()
  async translate(@Body('query') query : string) : Promise<string> {
    console.log(query)
    return this.translateService.translate(query);
  }

}