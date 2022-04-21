import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from '../user/user.entity';

@Entity('workspaces')
class Workspace {
  @PrimaryColumn()
  public id!: string;

  @Column({ type: 'varchar', length: 120 })
  public name: string;

  @Column({ type: 'varchar', length: 120 })
  public description: string;

  @Column({ type: 'varchar', name: 'owner_id' })
  public ownerId: string;

  @JoinColumn({ name: 'owner_id' })
  @ManyToOne(() => User)
  owner: User;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  public updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true, name: 'deleted_at' })
  public deletedAt!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Workspace };
