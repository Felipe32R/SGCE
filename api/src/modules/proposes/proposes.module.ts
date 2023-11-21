import { Module } from '@nestjs/common';
import { ProposesService } from './proposes.service';
import { ProposesController } from './proposes.controller';
import { PrismaService } from 'src/shared/database/prisma.service';

@Module({
  controllers: [ProposesController],
  providers: [ProposesService, PrismaService],
})
export class ProposesModule {}
