import { Controller, Post, Body } from '@nestjs/common';
import { PositionsService } from './positions.service';

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Post('byState')
  getByState(@Body() request: any) {
    return this.positionsService.findByState(
      request.cargo,
      request.estado,
      request.cidade,
    );
  }
}
