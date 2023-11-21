import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class GoalsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createDto: Prisma.MetasCreateArgs) {
    const goal = await this.prismaService.metas.create(createDto);
    return goal;
  }

  async update(id: string, updateDto: any) {
    await this.prismaService.metas.update({
      where: { id },
      data: updateDto,
    });
    return `Meta editada com sucesso!`;
  }

  async remove(id: string) {
    await this.prismaService.metas.delete({
      where: { id },
    });
    return `Meta removida com sucesso!`;
  }
}
