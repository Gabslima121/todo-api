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

  public getUserById(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'isDeleted'],
    });
  }

  public async createUser({
    email,
    name,
    password,
  }: ICreateUserDto): Promise<User> {
    const user: User = new User();

    const hashedPassword = await hash(password, 10);

    user.email = email;
    user.name = name;
    user.password = hashedPassword;

    return this.userRepository.save(user);
  }

  public getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
    // select: ['id', 'name', 'email', 'isDeleted'],
    // ();
  }
}

export { UserService };
