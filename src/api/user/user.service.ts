import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

import { ICreateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  public async login(email: string, password: string): Promise<User> {}

  public getUserById(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'isDeleted', 'role', 'avatar'],
    });
  }

  public getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'isDeleted', 'role', 'avatar'],
    });
  }

  public async checkIfUserExists(email: string): Promise<void> {
    const userExists = await this.getUserByEmail(email);

    if (userExists) {
      throw new Error('User already exists');
    }

    return;
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
