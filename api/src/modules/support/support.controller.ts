import { Controller, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { SupportService } from './support.service';
import { CreateSupportDto } from './dto/create-support.dto';
import { UpdateSupportDto } from './dto/update-support.dto';

@Controller('support')
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Post()
  create(@Body() createSupportDto: CreateSupportDto) {
    return this.supportService.create({
      data: createSupportDto,
    });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSupportDto: UpdateSupportDto) {
    return this.supportService.update(id, updateSupportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supportService.remove(id);
  }
}
