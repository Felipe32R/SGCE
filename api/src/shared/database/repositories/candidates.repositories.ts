import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';
@Injectable()
export class CandidatesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.CandidatoCreateArgs) {
    return this.prismaService.candidato.create(createDto);
  }
  findUnique(findUniqueDto: Prisma.CandidatoFindUniqueArgs) {
    return this.prismaService.candidato.findUnique(findUniqueDto);
  }
  findByCargo(nome: string, cidade?: string, estado?: string) {
    const where = {
      cargo: {
        nome,
      },
    };

    if (cidade) {
      where.cargo['cidade'] = cidade;
    }

    if (estado) {
      where.cargo['estado'] = estado;
    }

    return this.prismaService.candidato.findMany({
      where,
    });
  }

  deleteCandidate(id: string) {
    return this.prismaService.candidato.delete({
      where: { id },
    });
  }

  findPresidents() {
    return this.prismaService.candidato.findMany({
      where: {
        cargo: {
          nome: 'Presidente',
        },
      },
      include: {
        cargo: true,
        campanha: {
          include: {
            propostas: true,
            realizacoes: true,
            metas: true,
            apoios: true,
          },
        },
        redesSociais: true,
      },
    });
  }

  findByState(cargo: string, estado: string, cidade?: string) {
    const where: any = {
      cargo: {
        nome: cargo,
        estado: estado,
        ...(cidade ? { cidade: cidade } : {}),
      },
    };

    return this.prismaService.candidato.findMany({
      where: {
        AND: where,
      },
      include: {
        cargo: true,
        campanha: {
          include: {
            propostas: true,
            realizacoes: true,
            metas: true,
            apoios: true,
          },
        },
        redesSociais: true,
      },
    });
  }
}
