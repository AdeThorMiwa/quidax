import { Test } from '@nestjs/testing';
import AuthController from '@auth/controller';
import AuthService from '@user/service';
import { User } from '@prisma/client';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = await moduleRef.resolve(AuthController);
    authService = await moduleRef.resolve(AuthService);
  });

  describe('Sign Up', () => {
    const user: User = {
      id: 1,
      uid: '',
      email: 'adethormiwa@gmail.com',
      firstname: '',
      lastname: '',
      password: '',
      type: 'MEMBER',
      auth_mode: 'REGULAR',
      created_at: new Date(),
      updated_at: new Date(),
      planId: '',
      limit: 1024,
    };

    it('should create new user', async () => {
      jest.spyOn(authService, 'createUser').mockResolvedValue(user);

      expect(
        await authController.createUser({
          email: 'adethormiwa@outlook.com',
          password: 'Adethormiwa123.',
          passwordConfirm: 'Adethormiwa123.',
          firstname: 'Ade',
          lastname: 'Tom',
        }),
      ).toBe({});
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
