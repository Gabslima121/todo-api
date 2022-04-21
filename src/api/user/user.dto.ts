import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

class ICreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public name: string;

  @IsEmail()
  @IsOptional()
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
