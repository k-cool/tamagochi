import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TranslateService {
  private readonly client_id = process.env.PAPAGO_CLIENT_ID;
  private readonly client_secret = process.env.PAPAGO_CLIENT_SECRET;

  async translate(query: string): Promise<string> {
    console.log(query)
    const api_url = 'https://openapi.naver.com/v1/papago/n2mt';
    const options = {
      headers: {
        'X-Naver-Client-Id': this.client_id,
        'X-Naver-Client-Secret': this.client_secret,
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