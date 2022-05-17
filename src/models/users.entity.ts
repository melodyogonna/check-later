import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    nullable: false,
    unique: true,
  })
  @Generated("uuid")
  uuid: string;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @DeleteDateColumn()
  deletedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
