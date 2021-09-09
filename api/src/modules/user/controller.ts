import { UpdateUserDto } from '@user/dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Query,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { USER_SERVICE } from '@constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { callService } from '@utils/app';

@ApiTags('User')
@ApiBearerAuth('Authorization')
@Controller('/users')
class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: ClientProxy,
  ) {}

  @Get('/')
  async getUsers(@Query() q: any, @Req() req: any) {
    return callService(this.userService, 'read_users', {
      ...q,
      auth_token: req.headers.authorization,
    });
  }

  @Get('/:user_id')
  async getUser(@Param('user_id') userId: string, @Req() req: any) {
    return callService(this.userService, 'read_user', {
      user_id: userId,
      auth_token: req.headers.authorization,
    });
  }

  @Patch('/:user_id')
  async updateUser(
    @Param('user_id') userId: string,
    @Body() body: UpdateUserDto,
    @Req() req: any,
  ) {
    return callService(this.userService, 'patch_user', {
      ...body,
      user_id: userId,
      auth_token: req.headers.authorization,
    });
  }

  @Delete('/:user_id')
  async deleteUser(@Param('user_id') userId: string, @Req() req: any) {
    return callService(this.userService, 'delete_user', {
      user_id: userId,
      auth_token: req.headers.authorization,
    });
  }
}

export default UserController;
