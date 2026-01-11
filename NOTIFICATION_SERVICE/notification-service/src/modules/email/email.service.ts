import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(sendEmailDto: SendEmailDto) {
    const { to, subject, html, template, context } = sendEmailDto;

    if (!html && !template) {
      throw new Error('Provide either "html" or "template".');
    }

    await this.mailerService.sendMail({
      to,
      subject,
      ...(html ? { html } : {}),
      ...(template ? { template, context: context ?? {} } : {}),
      replyTo: undefined,
    });

    return { ok: true };
  }
}
