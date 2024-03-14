import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/core/guards/jwt.guard';

/**
 * Controller responsible for handling user-related requests.
 * All routes in this controller are under the '/users' base path.
 */
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  /**
   * Retrieves a user by ID.
   * @param params The parameters containing the user ID.
   * @param req The incoming request object.
   * @returns The user with the specified ID.
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUser(@Param() params: { id: string }, @Req() req) {
    return this.usersService.getUser(params.id, req);
  }

  /**
   * Retrieves all users.
   * @returns An array of all users.
   */
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
}
