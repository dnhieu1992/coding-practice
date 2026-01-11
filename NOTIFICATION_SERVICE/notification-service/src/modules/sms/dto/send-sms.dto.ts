import { IsNotEmpty, IsString } from 'class-validator';

export class SendSmsDto {
  @IsString()
  @IsNotEmpty()
  to!: string;

  @IsString()
  @IsNotEmpty()
  body!: string;
}
