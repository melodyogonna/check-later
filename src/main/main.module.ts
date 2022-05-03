import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import Items from "../models/items.entity";

import { MainController } from "./main.controller";
import { MainService } from "./main.service";

@Module({
  imports: [TypeOrmModule.forFeature([Items])],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule {}
