import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDTO } from './dto/chat.dto';
import { ResponseTransformInterceptor } from 'src/interceptors/responseTransform.interceptor';
import { TimeoutInterceptor } from 'src/interceptors/timeout.interceptor';

@Controller('chat')
@UseInterceptors(ResponseTransformInterceptor, TimeoutInterceptor)
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post()
  async chat(@Body() chatDTO: ChatDTO): Promise<string> {
    return await this.chatService.chat(chatDTO);
  }
}
