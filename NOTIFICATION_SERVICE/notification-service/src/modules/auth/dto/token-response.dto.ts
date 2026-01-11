import { ApiProperty } from '@nestjs/swagger';
import { UserItemDto } from '../../user/dto/user-item.dto';

export class AuthResponseDto {
  @ApiProperty({ type: UserItemDto })
  user: UserItemDto;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken: string;
}
