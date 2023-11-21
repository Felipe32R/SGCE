import { Controller, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { RealizationsService } from './realizations.service';
import { CreateRealizationDto } from './dto/create-realization.dto';
import { UpdateRealizationDto } from './dto/update-realization.dto';

@Controller('realizations')
export class RealizationsController {
  constructor(private readonly realizationsService: RealizationsService) {}

  @Post()
  create(@Body() createRealizationDto: CreateRealizationDto) {
    return this.realizationsService.create({
      data: createRealizationDto,
    });
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateRealizationDto: UpdateRealizationDto,
  ) {
    return this.realizationsService.update(id, updateRealizationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.realizationsService.remove(id);
  }
}
