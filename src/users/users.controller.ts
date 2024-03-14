import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/core/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUser(@Param() params: { id: string }, @Req() req) {
    return this.usersService.getUser(params.id, req);
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
}
