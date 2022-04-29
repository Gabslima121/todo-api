import {
  Controller,
  Get,
  Inject,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ICreateUserDto } from './user.dto';

import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;

  @Get(':id')
  public getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post('/create')
  public async createUser(
    @Body() { email, name, password, role, avatar }: ICreateUserDto,
  ): Promise<User> {
    try {
      if (role === ' ' || avatar === ' ') {
        return await this.userService.createUser({ email, name, password });
      }

      return await this.userService.createUser({
        email,
        name,
        password,
        role,
        avatar,
      });
    } catch (e) {
      return e.message;
    }
  }

  @Get()
  public getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}
