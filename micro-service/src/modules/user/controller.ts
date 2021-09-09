import { Controller, UseGuards } from '@nestjs/common';
import UserService from '@user/service';
import { AuthUserDto, CreateUserDto } from '@user/dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import AuthGuard from '@guards/auth';

@Controller()
class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('create_user')
  async createUser(@Payload() payload: CreateUserDto) {
    return await this.userService.createUser(payload);
  }

  @MessagePattern('read_users')
  @UseGuards(AuthGuard)
  async getAllUsers(@Payload() payload: any) {
    delete payload.auth_token;
    return await this.userService.getAllUsers(payload);
  }

  @MessagePattern('read_user')
  @UseGuards(AuthGuard)
  async getUser(@Payload() payload: { user_id: string }) {
    return await this.userService.getUser(payload.user_id);
  }

  @MessagePattern('patch_user')
  @UseGuards(AuthGuard)
  async updateUser(@Payload() payload: any) {
    delete payload.auth_token;
    return await this.userService.updateUser(payload.user_id, {
      ...payload,
      user_id: undefined,
    });
  }

  @MessagePattern('delete_user')
  @UseGuards(AuthGuard)
  async deleteUser(@Payload() payload: { user_id: string }) {
    return await this.userService.deleteUser(payload.user_id);
  }

  @MessagePattern('auth_user')
  async authenticateUser(@Payload() payload: AuthUserDto) {
    return await this.userService.authUser(payload.email, payload.password);
  }
}

export default UserController;
