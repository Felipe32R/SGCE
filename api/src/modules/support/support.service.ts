import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class SupportService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createSupportDto: Prisma.ApoiosCreateArgs) {
    const support = await this.prismaService.apoios.create(createSupportDto);
    return support;
  }

  async update(id: string, updateSupportDto: any) {
    await this.prismaService.apoios.update({
      where: { id },
      data: updateSupportDto,
    });
    return `Apoio atualizado com sucesso!`;
  }

  async remove(id: string) {
    await this.prismaService.apoios.delete({
      where: { id },
    });
    return `Apoio removido com sucesso!`;
  }
}
