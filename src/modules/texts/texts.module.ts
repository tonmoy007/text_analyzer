import { Module } from '@nestjs/common';
import { TextsService } from './texts.service';
import { TextsController } from './texts.controller';
import { PrismaService } from '../common';

@Module({
  controllers: [TextsController],
  providers: [TextsService, PrismaService],
})
export class TextsModule {}
