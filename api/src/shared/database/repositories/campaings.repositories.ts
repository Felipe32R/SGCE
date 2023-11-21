import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { type Prisma } from '@prisma/client';
@Injectable()
export class CampaignsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.CampanhaCreateArgs) {
    return this.prismaService.campanha.create(createDto);
  }
  findAll() {
    return this.prismaService.campanha.findMany();
  }

  findUnique(findUniqueDto: Prisma.CampanhaFindUniqueArgs) {
    return this.prismaService.campanha.findUnique(findUniqueDto);
  }

  update(id: string, biografia: string) {
    return this.prismaService.campanha.update({
      where: { id },
      data: {
        biografia,
      },
    });
  }
}
