import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

/**
 * Controller responsible for handling authentication-related requests.
 * All routes in this controller are under the '/auth' base path.
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /**
   * Endpoint for user signup.
   * @param dto The data transfer object containing signup information.
   * @returns The result of the signup operation.
   */
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  /**
   * Endpoint for user signin.
   * @param dto The data transfer object containing signin information.
   * @param req The incoming request object.
   * @param res The outgoing response object.
   * @returns The result of the signin operation.
   */
  @Post('signin')
  signin(@Body() dto: AuthDto, @Req() req, @Res() res) {
    return this.authService.signin(dto, req, res);
  }

  /**
   * Endpoint for user signout.
   * @param req The incoming request object.
   * @param res The outgoing response object.
   * @returns The result of the signout operation.
   */
  @Get('signout')
  signout(@Req() req, @Res() res) {
    return this.authService.signout(req, res);
  }
}
