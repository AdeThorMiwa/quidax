import { CreateUserDto, AuthUserDto } from '@user/dto';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { USER_SERVICE } from '@constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { callService } from '@utils/app';

@ApiTags('Auth')
@Controller('/auth')
class AuthController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: ClientProxy,
  ) {}

  @Post('/register')
  async registerUser(@Body() body: CreateUserDto) {
    return callService(this.userService, 'create_user', body);
  }

  @Post('/login')
  async authenticateUser(@Body() body: AuthUserDto) {
    return callService(this.userService, 'auth_user', body);
  }
}

export default AuthController;
