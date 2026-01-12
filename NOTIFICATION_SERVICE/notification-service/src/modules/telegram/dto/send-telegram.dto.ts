import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendTelegramDto {
  @ApiProperty({
    description: 'Message text to send',
    example: 'Hello from Telegram bot!',
  })
  @IsString()
  @IsNotEmpty()
  text!: string;

  @ApiProperty({
    description: 'Parse mode (HTML, Markdown, or MarkdownV2)',
    example: 'HTML',
    required: false,
  })
  @IsOptional()
  @IsString()
  parseMode?: string;

  @ApiProperty({
    description: 'Chat ID (overrides default chat ID)',
    example: -1001234567890,
    required: false,
  })
  @IsOptional()
  chatId?: number | string;

  @ApiProperty({
    description: 'Message thread ID (for forum topics)',
    example: 123,
    required: false,
  })
  @IsOptional()
  messageThreadId?: number;
}
