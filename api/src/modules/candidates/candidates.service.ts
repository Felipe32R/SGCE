import { Injectable } from '@nestjs/common';
import { CandidatesRepository } from 'src/shared/database/repositories/candidates.repositories';

@Injectable()
export class CandidatesService {
  constructor(private readonly candidatesRepository: CandidatesRepository) {}

  async getCandidateById(candidateId: string) {
    return await this.candidatesRepository.findUnique({
      where: {
        id: candidateId,
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

  async getPresidents() {
    return await this.candidatesRepository.findPresidents();
  }
  async getByState(nome: string, estado: string) {
    return await this.candidatesRepository.findByState(nome, estado);
  }
}
