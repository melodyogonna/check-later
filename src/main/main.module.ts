import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import Items from "../models/items.entity";
import User from "../models/users.entity";

import { MainController } from "./main.controller";
import { MainService } from "./main.service";

@Module({
  imports: [TypeOrmModule.forFeature([Items, User])],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule {}
