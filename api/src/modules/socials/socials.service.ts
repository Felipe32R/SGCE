import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SocialsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createSocialDto: Prisma.RedeSocialCreateArgs) {
    const social = await this.prismaService.redeSocial.create(createSocialDto);
    return social;
  }

  async update(id: string, updateSocialDto: any) {
    await this.prismaService.redeSocial.update({
      where: { id },
      data: updateSocialDto,
    });
    return `Rede social editada com sucesso!`;
  }

  async remove(id: string) {
    await this.prismaService.redeSocial.delete({
      where: { id },
    });
    return `Rede social removida com sucesso!`;
  }
}
