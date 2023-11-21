import { Module } from '@nestjs/common';
import { RealizationsService } from './realizations.service';
import { RealizationsController } from './realizations.controller';
import { PrismaService } from 'src/shared/database/prisma.service';

@Module({
  controllers: [RealizationsController],
  providers: [RealizationsService, PrismaService],
})
export class RealizationsModule {}
