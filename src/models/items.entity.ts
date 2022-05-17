import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Index,
  Generated,
  ManyToOne,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import User from "./users.entity";

@Entity()
export default class Items {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({
    nullable: false,
  })
  @Generated("uuid")
  uuid: string;

  @Column()
  url: string;

  @Column({
    type: "text",
    default: null,
  })
  description: string;

  @Column({
    type: "datetime",
  })
  dueDate: Date;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    cascade: true,
  })
  user: User;

  @DeleteDateColumn()
  deletedAt?: Date;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
