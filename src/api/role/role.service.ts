import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateRoleDto } from './role.dto';
import { Role } from './role.entity';

@Injectable()
class RoleService {
  @InjectRepository(Role)
  private readonly roleRepository: Repository<Role>;

  public async createRole({ name }: ICreateRoleDto): Promise<Role> {
    const role: Role = new Role();

    role.name = name;

    return await this.roleRepository.save(role);
  }
}

export { RoleService };
