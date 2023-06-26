import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, CreateChatCompletionRequest, OpenAIApi } from 'openai';
import { ChatDTO } from './dto/chat.dto';
import { GptTemplate } from 'src/GptTemplate';
import { MBTI, PET, STATUS, USER } from 'src/data/gtpTestData';

@Injectable()
export class ChatService {
  private logger = Logger;
  openai: OpenAIApi;

  constructor(private readonly configService: ConfigService) {
    const configuration = new Configuration({
      organization: configService.get('OPENAI_API_ORGANIZATION_ID'),
      apiKey: configService.get('OPENAI_API_KEY'),
    });

    this.openai = new OpenAIApi(configuration);
  }

  async chat(chatDTO: ChatDTO): Promise<string> {
    const content = new GptTemplate(
      USER,
      PET,
      STATUS,
      MBTI,
      chatDTO.chatText,
    ).getTemplate();

    const body: CreateChatCompletionRequest = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content }],
    };

    const gptResult = await this.openai
      .createChatCompletion(body)
      .then((res) => {
        if (res.status === 200) {
          const { prompt_tokens, completion_tokens, total_tokens } =
            res.data.usage;
          this.logger.verbose(
            `TOKEN USAGE: prompt: ${prompt_tokens}, completion: ${completion_tokens}, total: ${total_tokens}`,
          );

          return JSON.parse(res.data.choices[0].message.content);
        }
        throw new Error('Failed to get assistant reply.');
      })
      .catch((error) => {
        console.error(error);
        throw new InternalServerErrorException(error.message);
      });

    return gptResult;
  }
}
