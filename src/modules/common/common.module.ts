import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { HealthController } from './controller';
import { LogInterceptor } from './flow';
import { configProvider, LoggerService, PrismaService } from './provider';

@Module({
  imports: [TerminusModule],
  providers: [LoggerService, LogInterceptor, PrismaService],
  exports: [LoggerService, LogInterceptor, PrismaService],
  controllers: [HealthController],
})
export class CommonModule {}
