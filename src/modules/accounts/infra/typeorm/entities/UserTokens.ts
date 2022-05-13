import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { User } from "./User";

@Entity("users_token")
export class UserTokens {
  @PrimaryColumn()
  id: string;

  @Column()
  refresh_token: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  expires_date: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}