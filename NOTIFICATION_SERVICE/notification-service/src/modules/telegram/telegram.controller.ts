import { Body, Controller, Post } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { SendTelegramDto } from './dto/send-telegram.dto';

@Controller('telegram')
export class TelegramController {
  constructor(private readonly telegram: TelegramService) {}

  @Post('send')
  send(@Body() dto: SendTelegramDto) {
    return this.telegram.sendToGroup(dto);
  }
}
