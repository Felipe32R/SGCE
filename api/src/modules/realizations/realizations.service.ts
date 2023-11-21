import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/shared/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RealizationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createRealizationDto: Prisma.RealizacaoCreateArgs) {
    const realization =
      this.prismaService.realizacao.create(createRealizationDto);
    return realization;
  }

  async update(id: string, updateRealizationDto: any) {
    await this.prismaService.realizacao.update({
      where: { id },
      data: updateRealizationDto,
    });
    return `Realização editada com sucesso!`;
  }

  async remove(id: string) {
    await this.prismaService.realizacao.delete({
      where: { id },
    });
    return `Realização removida com sucesso!`;
  }
}
