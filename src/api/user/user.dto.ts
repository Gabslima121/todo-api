import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

class ICreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public name: string;

  @IsEmail()
  @IsOptional()
  public email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  public password: string;

  @IsString()
  @IsOptional()
  public role?: string;

  @IsString()
  @IsOptional()
  public avatar?: string;
}

export { ICreateUserDto };
