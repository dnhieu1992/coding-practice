import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendTelegramDto {
  @IsString()
  @IsNotEmpty()
  text!: string;

  @IsOptional()
  @IsString()
  parseMode?: string;

  @IsOptional()
  chatId?: number | string;

  @IsOptional()
  messageThreadId?: number;
}
