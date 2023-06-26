import { IsNotEmpty, IsString } from 'class-validator';

export class ChatDTO {
  @IsNotEmpty()
  @IsString()
  chatText: string;
}
