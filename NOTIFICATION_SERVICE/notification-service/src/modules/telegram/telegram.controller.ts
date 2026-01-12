import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { TelegramService } from './telegram.service';
import { SendTelegramDto } from './dto/send-telegram.dto';

@ApiTags('telegram')
@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegram: TelegramService) {}

  @Post('send')
  @ApiOperation({ summary: 'Send a Telegram message to a group' })
  @ApiBody({ type: SendTelegramDto })
  @ApiResponse({
    status: 200,
    description: 'Telegram message sent successfully',
    schema: {
      example: {
        ok: true,
        messageId: 123,
        chatId: -1001234567890,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  send(@Body() dto: SendTelegramDto) {
    return this.telegram.sendToGroup(dto);
  }
}
