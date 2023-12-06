import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class PositionsService {
  constructor(private readonly prismaService: PrismaService) {}
  findByState(cargo: string, estado?: string, cidade?: string) {
    const today = new Date();
    return this.prismaService.cargo.findMany({
      where: {
        AND: [
          { nome: cargo },
          estado ? { estado: estado } : {},
          cidade ? { cidade: cidade } : {},
          { data_inicio: { gte: today } },
        ],
      },
    });
  }
}
