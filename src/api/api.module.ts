import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, WorkspaceModule, AuthModule],
})
export class ApiModule {}
