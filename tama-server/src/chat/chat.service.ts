import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, CreateChatCompletionRequest, OpenAIApi } from 'openai';
import { ChatDTO } from './dto/chat.dto';

@Injectable()
export class ChatService {
  openai: OpenAIApi;

  constructor(private readonly configService: ConfigService) {
    const configuration = new Configuration({
      organization: configService.get('OPENAI_API_ORGANIZATION_ID'),
      apiKey: configService.get('OPENAI_API_KEY'),
    });

    this.openai = new OpenAIApi(configuration);
  }

  async chat(chatDTO: ChatDTO): Promise<string> {
    const body: CreateChatCompletionRequest = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: chatDTO.chatText }],
    };

    const gptResult = await this.openai
      .createChatCompletion(body)
      .then((res) => {
        if (res.status === 200) return res.data.choices[0].message.content;
        throw new Error('Failed to get assistant reply.');
      })
      .catch((error) => {
        console.error(error);
        throw new InternalServerErrorException(error.message);
      });

    return gptResult;
  }
}
