import { Module } from '@nestjs/common';
import { TypeOrmModule} from "@nestjs/typeorm"
import { MainModule } from './main/main.module';

@Module({
  imports: [TypeOrmModule.forRoot(), MainModule],
})
export class AppModule {}
