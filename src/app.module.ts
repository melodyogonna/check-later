import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MainModule } from "./main/main.module";

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(), MainModule],
})
export class AppModule {}
