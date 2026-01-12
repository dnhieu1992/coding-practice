import { Module } from '@nestjs/common';
import { SmsController } from './sms.controller';
import { SmsService } from './sms.service';

@Module({
  providers: [SmsService],
  exports: [SmsService],
  controllers: [SmsController],
})
export class SmsModule {}
