import { IsNotEmpty, IsString } from 'class-validator';

class ICreateRoleDto {
  @IsString()
  @IsNotEmpty()
  public name: string;
}

export { ICreateRoleDto };
