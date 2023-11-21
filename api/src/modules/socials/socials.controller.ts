import { Controller, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { SocialsService } from './socials.service';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialDto } from './dto/update-social.dto';

@Controller('socials')
export class SocialsController {
  constructor(private readonly socialsService: SocialsService) {}

  @Post()
  create(@Body() createSocialDto: CreateSocialDto) {
    return this.socialsService.create({
      data: createSocialDto,
    });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSocialDto: UpdateSocialDto) {
    return this.socialsService.update(id, updateSocialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.socialsService.remove(id);
  }
}
