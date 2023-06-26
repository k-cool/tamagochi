import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [ChatController],
  providers: [ChatService, ConfigService]
})
export class ChatModule {}
