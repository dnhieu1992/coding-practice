import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendSmsDto {
  @ApiProperty({
    description: 'Recipient phone number',
    example: '+1234567890',
  })
  @IsString()
  @IsNotEmpty()
  to!: string;

  @ApiProperty({
    description: 'SMS message body',
    example: 'Hello, this is a test message',
  })
  @IsString()
  @IsNotEmpty()
  body!: string;
}
