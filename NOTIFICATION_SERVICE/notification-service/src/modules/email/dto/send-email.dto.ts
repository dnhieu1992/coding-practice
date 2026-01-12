import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendEmailDto {
  @ApiProperty({
    description: 'Recipient email address',
    example: 'recipient@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @ApiProperty({
    description: 'Email subject',
    example: 'Welcome to our service',
  })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    description: 'Plain text content of the email',
    example: 'This is a plain text email',
    required: false,
  })
  @IsString()
  @IsOptional()
  text?: string;

  @ApiProperty({
    description: 'HTML content of the email (alternative to template)',
    example: '<h1>Welcome</h1><p>This is an HTML email</p>',
    required: false,
  })
  @IsString()
  @IsOptional()
  html?: string;

  @ApiProperty({
    description: 'Template name (alternative to html)',
    example: 'welcome',
    required: false,
  })
  @IsString()
  @IsOptional()
  template?: string;

  @ApiProperty({
    description: 'Template context variables (used with template)',
    example: { name: 'John', code: '12345' },
    required: false,
  })
  @IsObject()
  @IsOptional()
  context?: Record<string, any>;
}
