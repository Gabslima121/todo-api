import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Workspace } from './workspace.entity';
import { ICreateWorkspaceDto } from './workspace.dto';

@Injectable()
export class WorkspaceService {
  @InjectRepository(Workspace)
  private readonly workspaceRepository: Repository<Workspace>;

  public async createWorkspace({
    isPublic,
    name,
    ownerId,
    description,
  }: ICreateWorkspaceDto): Promise<Workspace> {
    const workspace = new Workspace();

    workspace.isPublic = isPublic;
    workspace.name = name;
    workspace.ownerId = ownerId;
    workspace.description = description;

    return this.workspaceRepository.save(workspace);
  }
}
