import { Module } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { CampaignsRepository } from 'src/shared/database/repositories/campaings.repositories';
import { PrismaService } from 'src/shared/database/prisma.service';

@Module({
  controllers: [CampaignsController],
  providers: [CampaignsService, CampaignsRepository, PrismaService],
})
export class CampaignsModule {}
