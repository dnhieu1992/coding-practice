import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
interface RequestWithUser extends Request {
  user: {
    id: string;
  };
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async getProfile(@Req() req: RequestWithUser) {
    return this.userService.getUserById(req.user.id);
  }
}
