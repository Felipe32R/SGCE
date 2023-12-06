import { Module } from '@nestjs/common';
import { PrismaService } from './shared/database/prisma.service';
import { CandidatesService } from './modules/candidates/candidates.service';
import { CandidatesController } from './modules/candidates/candidates.controller';
import { CandidatesModule } from './modules/candidates/candidates.module';
import { CandidatesRepository } from './shared/database/repositories/candidates.repositories';
import { DatabaseModule } from './shared/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CampaignsModule } from './modules/campaigns/campaigns.module';
import { SocialsModule } from './modules/socials/socials.module';
import { ProposesModule } from './modules/proposes/proposes.module';
import { RealizationsModule } from './modules/realizations/realizations.module';
import { GoalsModule } from './modules/goals/goals.module';
import { SupportModule } from './modules/support/support.module';
import { PositionsModule } from './modules/positions/positions.module';

@Module({
  imports: [
    CandidatesModule,
    DatabaseModule,
    AuthModule,
    JwtModule,
    CampaignsModule,
    SocialsModule,
    ProposesModule,
    RealizationsModule,
    GoalsModule,
    SupportModule,
    PositionsModule,
  ],
  controllers: [CandidatesController],
  providers: [
    CandidatesService,
    PrismaService,
    CandidatesRepository,
    JwtService,
  ],
})
export class AppModule {}
