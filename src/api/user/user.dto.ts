import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class ICreateUserDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export { ICreateUserDto };
