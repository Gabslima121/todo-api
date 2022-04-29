import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from '../user/user.entity';

import { UserService } from '../user/user.service';
import { UserPayload, UserToken } from './dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      isDeleted: user.isDeleted,
    };

    const jwtToken = this.jwtService.sign(payload);

    return { accessToken: jwtToken };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);

    if (user) {
      const isPasswordValid = await compare(password, user.password);

      if (isPasswordValid) {
        return {
          id: user.id,
          email: user.email,
          role: user.role,
          isDeleted: user.isDeleted,
        };
      }
    }

    throw new Error('Invalid credentials');
  }
}
