import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Twilio from 'twilio';
import { SendSmsDto } from './dto/send-sms.dto';

@Injectable()
export class SmsService {
  private readonly client: Twilio.Twilio;
  private readonly from?: string;
  private readonly messagingServiceSid?: string;

  constructor(private readonly config: ConfigService) {
    const accountSid = this.config.get<string>('TWILIO_ACCOUNT_SID');
    const authToken = this.config.get<string>('TWILIO_AUTH_TOKEN');

    if (!accountSid || !authToken) {
      throw new Error('Missing TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN');
    }

    this.client = Twilio(accountSid, authToken);
    this.from = this.config.get<string>('TWILIO_FROM');
    this.messagingServiceSid = this.config.get<string>(
      'TWILIO_MESSAGING_SERVICE_SID',
    );

    if (!this.from && !this.messagingServiceSid) {
      throw new Error('Provide TWILIO_FROM or TWILIO_MESSAGING_SERVICE_SID');
    }
  }

  async sendSms(dto: SendSmsDto) {
    const msg = await this.client.messages.create({
      to: dto.to,
      body: dto.body,
      ...(this.messagingServiceSid
        ? { messagingServiceSid: this.messagingServiceSid }
        : { from: this.from! }),
    });

    return {
      sid: msg.sid,
      status: msg.status,
      to: msg.to,
    };
  }
}
