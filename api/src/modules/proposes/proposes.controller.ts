import { Controller, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProposesService } from './proposes.service';
import { CreateProposeDto } from './dto/create-propose.dto';
import { UpdateProposeDto } from './dto/update-propose.dto';

@Controller('proposes')
export class ProposesController {
  constructor(private readonly proposesService: ProposesService) {}

  @Post()
  create(@Body() createDto: CreateProposeDto) {
    return this.proposesService.create({
      data: createDto,
    });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateProposeDto) {
    return this.proposesService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proposesService.remove(id);
  }
}
