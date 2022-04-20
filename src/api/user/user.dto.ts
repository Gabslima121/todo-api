import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

class ICreateUserDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  @IsOptional()
  public role?: string;

  @IsString()
  @IsOptional()
  public avatar?: string;
}

export { ICreateUserDto };
