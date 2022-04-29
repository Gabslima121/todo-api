import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

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
