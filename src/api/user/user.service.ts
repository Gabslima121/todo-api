import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';

import { ICreateUserDto } from './user.dto';
import { User } from './user.entity';
import { sign } from 'jsonwebtoken';

interface IAuthenticateService {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  user: {
    name: string;
    role: string;
    email: string;
    isDelete: boolean;
  };
}

@Injectable()
class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  public getUserById(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'isDeleted', 'role', 'avatar'],
    });
  }

  public getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      select: [
        'id',
        'name',
        'email',
        'isDeleted',
        'role',
        'avatar',
        'password',
      ],
    });
  }

  public async createUser({
    email,
    name,
    password,
    role,
    avatar,
  }: ICreateUserDto): Promise<User> {
    const user: User = new User();

    const hashedPassword = await hash(password, 10);

    const userExists = await this.getUserByEmail(email);

    if (userExists) {
      throw new Error('User already exists');
    }

    user.email = email;
    user.name = name;
    user.password = hashedPassword;
    user.role = role;
    user.avatar = avatar;

    return this.userRepository.save(user);
  }

  public getAllUsers(): Promise<User[]> {
    return this.userRepository.find({
      select: ['id', 'name', 'email', 'isDeleted', 'role', 'avatar'],
    });
  }
}

export { UserService };
