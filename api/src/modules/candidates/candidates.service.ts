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
  async getByState(cargo: string, estado: string, cidade: string) {
    return await this.candidatesRepository.findByState(cargo, estado, cidade);
  }

  async deleteCandidate(id: string) {
    return await this.candidatesRepository.deleteCandidate(id);
  }
}
