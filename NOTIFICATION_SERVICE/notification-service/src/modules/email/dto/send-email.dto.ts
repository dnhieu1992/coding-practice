import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  text: string;

  @IsString()
  @IsOptional()
  html?: string;

  @IsString()
  @IsOptional()
  template?: string;

  @IsObject()
  @IsOptional()
  context?: Record<string, any>;
}
