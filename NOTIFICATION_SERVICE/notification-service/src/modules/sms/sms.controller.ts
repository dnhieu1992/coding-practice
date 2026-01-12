import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { SmsService } from './sms.service';
import { SendSmsDto } from './dto/send-sms.dto';

@ApiTags('sms')
@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('send')
  @ApiOperation({ summary: 'Send an SMS message' })
  @ApiBody({ type: SendSmsDto })
  @ApiResponse({
    status: 200,
    description: 'SMS sent successfully',
    schema: {
      example: {
        sid: 'SM1234567890abcdef',
        status: 'queued',
        to: '+1234567890',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  async sendSms(@Body() dto: SendSmsDto) {
    return this.smsService.sendSms(dto);
  }
}
