import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CandidatesRepository } from './repositories/candidates.repositories';
import { CampaignsRepository } from './repositories/campaings.repositories';

@Global()
@Module({
  providers: [PrismaService, CandidatesRepository, CampaignsRepository],
  exports: [CandidatesRepository, CampaignsRepository],
})
export class DatabaseModule {}
