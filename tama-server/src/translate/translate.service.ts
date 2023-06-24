import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class TranslateService {
  constructor(
    private readonly config : ConfigService,
    ) { }
    
  async translate(query: string): Promise<string> {
    const papagoClientId = this.config.get('PAPAGO_CLIENT_ID');
    const papagoClientSecret = this.config.get('PAPAGO_CLIENT_SECRET');
    const api_url = 'https://openapi.naver.com/v1/papago/n2mt';
    const options = {
      headers: {
        'X-Naver-Client-Id': papagoClientId,
        'X-Naver-Client-Secret': papagoClientSecret,
      },
    };

    const requestBody = {
      source: 'ko',
      target: 'en',
      text: query,
    };

    try {
      const response = await axios.post(api_url, requestBody, options);
      return response.data.message.result.translatedText;
    } catch (error) {
      throw new Error(`Translation failed: ${error.message}`);
    }
  }
}

// response 데이터 예시
// {
//     "message": {
//         "result": {
//             "srcLangType": "ko",
//             "tarLangType": "en",
//             "translatedText": "Hello?",
//             "engineType": "PRETRANS"
//         },
//         "@type": "response",
//         "@service": "naverservice.nmt.proxy",
//         "@version": "1.0.0"
//     }
// }
