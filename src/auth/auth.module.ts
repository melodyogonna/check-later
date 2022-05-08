import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import User from "../models/users.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
})
export class AuthModule {}
