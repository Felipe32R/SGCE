import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProposesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProposeDto: Prisma.PropostaCreateArgs) {
    const propose = await this.prismaService.proposta.create(createProposeDto);
    return propose;
  }

  async update(id: string, updateProposeDto: any) {
    await this.prismaService.proposta.update({
      where: { id },
      data: updateProposeDto,
    });
    return `Proposta editada com sucesso!`;
  }

  async remove(id: string) {
    await this.prismaService.proposta.delete({
      where: { id },
    });
    return `Proposta removida com sucesso!`;
  }
}
