import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { SendTelegramDto } from './dto/send-telegram.dto';

type TgResponse<T> =
  | { ok: true; result: T }
  | { ok: false; error_code: number; description: string };

@Injectable()
export class TelegramService {
  private readonly token: string;
  private readonly defaultChatId: number | string;
  private readonly defaultThreadId?: number;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    const token = this.config.get<string>('TELEGRAM_BOT_TOKEN');
    const chatId = this.config.get<string>('TELEGRAM_CHAT_ID');

    if (!token) throw new Error('Missing TELEGRAM_BOT_TOKEN');
    if (!chatId) throw new Error('Missing TELEGRAM_CHAT_ID');

    this.token = token;
    this.defaultChatId = isNaN(Number(chatId)) ? chatId : Number(chatId);

    const thread = this.config.get<string>('TELEGRAM_MESSAGE_THREAD_ID');
    this.defaultThreadId = thread ? Number(thread) : undefined;
  }

  async sendToGroup(dto: SendTelegramDto) {
    const url = `https://api.telegram.org/bot${this.token}/sendMessage`;

    // sendMessage yêu cầu chat_id + text, hỗ trợ parse_mode và message_thread_id :contentReference[oaicite:5]{index=5}
    const payload = {
      chat_id: dto.chatId ?? this.defaultChatId,
      text: dto.text,
      parse_mode: dto.parseMode,
      message_thread_id: dto.messageThreadId ?? this.defaultThreadId,
      disable_web_page_preview: true,
    };

    const res = await lastValueFrom(
      this.http.post<TgResponse<{ message_id: number; chat?: { id: number } }>>(
        url,
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      ),
    );

    if (!res.data.ok) {
      // Bot API trả ok=false kèm description khi lỗi
      throw new Error(
        `Telegram error ${res.data.error_code}: ${res.data.description}`,
      );
    }

    return {
      ok: true,
      messageId: res.data.result.message_id,
      chatId: res.data.result.chat?.id,
    };
  }
}
