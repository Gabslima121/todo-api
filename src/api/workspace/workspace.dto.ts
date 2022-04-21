import { IsBoolean, IsOptional, IsString } from 'class-validator';

class ICreateWorkspaceDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  isPublic: boolean;

  @IsString()
  ownerId: string;
}

export { ICreateWorkspaceDto };
