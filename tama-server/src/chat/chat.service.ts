import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAIApi } from 'openai';
import axios from 'axios';

@Injectable()
export class ChatService {
    openai: OpenAIApi;
    constructor(
        private readonly config: ConfigService,
    ) {
        this.openai = new OpenAIApi(this.config.get('OPENAI_API_KEY'));
    }
    async chat(chatText: string): Promise<string> {
        const messages = [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: chatText },
        ];

        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: chatText }],
            }, {
                headers: {
                    Authorization: `Bearer ${this.config.get('OPENAI_API_KEY')}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                const assistantReply = response.data.choices[0].message.content;
                return assistantReply;
            } else {
                throw new Error('Failed to get assistant reply.');
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
}


