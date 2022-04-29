import { Request } from 'express';
import { User } from 'src/api/user/user.entity';

export interface AuthRequest extends Request {
  user: User;
}

export interface UserPayload {
  sub: string;
  email: string;
  role: string;
  isDeleted: boolean;
  iat?: number;
  exp?: number;
}

export interface UserToken {
  accessToken: string;
}
