import { ApiProperty } from '@nestjs/swagger';

export class UserItemDto {
  @ApiProperty({ example: 'uuid' })
  id: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: '' })
  firstName: string;

  @ApiProperty({ example: '' })
  lastName: string;

  @ApiProperty({ example: '', required: false })
  phone?: string;

  @ApiProperty({ example: '', required: false })
  address?: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;
}
