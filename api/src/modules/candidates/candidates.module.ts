import { Module } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CandidatesController } from './candidates.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CandidatesController],
  providers: [CandidatesService, JwtService],
})
export class CandidatesModule {}
