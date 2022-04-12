import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ICreateRoleDto } from './role.dto';

import { Role } from './role.entity';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  @Inject(RoleService)
  private readonly roleService: RoleService;

  @Post('/create')
  public async createUser(@Body() { name }: ICreateRoleDto): Promise<Role> {
    try {
      return await this.roleService.createRole({ name });
    } catch (e) {
      return e.message;
    }
  }
}
