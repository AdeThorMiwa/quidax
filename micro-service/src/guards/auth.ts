import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { retrieveTokenValue } from '@utils/jwt';
import PrismaService from '@services/prisma';

@Injectable()
class AuthGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: any = context.switchToRpc();

    request.user = await this.getAuth(request.getData().auth_token);
    return true;
  }

  async getAuth(auth: any): Promise<User> {
    let token;
    if (auth && auth.startsWith('Bearer')) {
      token = auth.split('Bearer')[1].trim();
    }

    if (!token) throw new BadRequestException('Invalid Authorization Token');

    const { id } = await retrieveTokenValue<{ id: string }>(token);

    const user = await this.prismaService.user.findFirst({
      where: { uid: id },
    });

    if (!user)
      throw new UnauthorizedException(
        'The user belonging to this token no longer exist',
      );

    return user;
  }
}

export default AuthGuard;
