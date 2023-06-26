import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
    constructor (
        private chatService: ChatService,
    ) {}

    @Post()
    async chat(@Body('chatText') chatText : string): Promise<string> {
        return await this.chatService.chat(chatText);
    }
}
