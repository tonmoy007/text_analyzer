import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './modules/common';
import { AuthModule } from './modules/auth';
import { TextsModule } from './modules/texts/texts.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), CommonModule, AuthModule, TextsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
