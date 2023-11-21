import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CandidatesService } from './candidates.service';

import { AuthGuard } from '../auth/auth.guard';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  me(@Req() request: any) {
    return this.candidatesService.getCandidateById(request.candidateId);
  }

  @Get('presidents')
  getPresidents() {
    return this.candidatesService.getPresidents();
  }

  @Post('state')
  getByState(@Body() request: any) {
    return this.candidatesService.getByState(request.nome, request.estado);
  }
}
