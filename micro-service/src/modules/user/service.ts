import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from '@user/dto';
import UserRepository from '@user/repository';
import { encrypt, verify } from '@utils/bcrypt';
import { signToken } from '@utils/jwt';
import QueryBuilder from '@utils/querybuilder';

@Injectable()
class UserService {
  private logger: Logger = new Logger(UserService.name);
  constructor(private userRepository: UserRepository) {}

  async createUser(data: CreateUserDto): Promise<User & { token: string }> {
    // format the user data
    const user_data = {
      name: data.name,
      email: data.email,
      password: await encrypt(data.password),
    };

    this.logger.verbose(user_data, 'User Data');

    // create new user with formated data
    try {
      const user = await this.userRepository.create(user_data);
      this.logger.log(user, 'New User');

      // generate auth token
      const token = signToken(user.uid);

      return { ...user, token };
    } catch (e) {
      this.logger.error(e.message, 'Error creating user');

      throw new BadRequestException(e.message);
    }
  }

  async getAllUsers(q: any): Promise<User[]> {
    this.logger.log(JSON.stringify(q), 'Input Query Parameter');

    try {
      const builder = new QueryBuilder(q);
      const query = builder.build(['filter', 'paginate', 'select', 'sort']);

      this.logger.log(JSON.stringify(query), 'Builder Query');

      return await this.userRepository.getAll(query);
    } catch (e) {
      this.logger.error(e.message, 'Error fetching users');

      throw new BadRequestException(e.message);
    }
  }

  async getUser(userId: string): Promise<User> {
    this.logger.log(userId, 'User ID');

    try {
      return await this.userRepository.getById(userId);
    } catch (e) {
      this.logger.error(e.message, 'Error fetching user');

      throw new BadRequestException(e.message);
    }
  }

  async updateUser(
    userId: string,
    body: Record<string, unknown>,
  ): Promise<User> {
    this.logger.log(userId, 'User ID');

    try {
      return await this.userRepository.updateById(userId, body);
    } catch (e) {
      this.logger.error(e.message, 'Error updating user');

      throw new BadRequestException(e.message);
    }
  }

  async deleteUser(userId: string): Promise<User> {
    this.logger.log(userId, 'User ID');

    try {
      return await this.userRepository.deleteById(userId);
    } catch (e) {
      this.logger.error(e.message, 'Error deleting user');

      throw new BadRequestException(e.message);
    }
  }

  async authUser(email: string, password: string) {
    const user = await this.userRepository.getByEmail(email);

    if (!user || !(await verify(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = signToken(user.uid);
    return { user, token };
  }
}

export default UserService;
