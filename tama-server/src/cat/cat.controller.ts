import { Body, Controller, Get, Post } from '@nestjs/common';
import { CatsService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private catService: CatsService) {}

  @Post()
  async createCat(@Body() createCatDto: CreateCatDto) {
    return await this.catService.create(createCatDto);
  }

  @Get()
  async getCats() {
    return await this.catService.findAll();
  }
}
