import { Injectable } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { CampaignsRepository } from 'src/shared/database/repositories/campaings.repositories';

@Injectable()
export class CampaignsService {
  constructor(private readonly campaignsRepository: CampaignsRepository) {}

  async create(createCampaignDto: CreateCampaignDto) {
    const campaign = await this.campaignsRepository.create({
      data: createCampaignDto,
    });

    return { campaignId: campaign.id };
  }

  async findAll() {
    return this.campaignsRepository.findAll();
  }

  async findOne(id: string) {
    const campaign = await this.campaignsRepository.findUnique({
      where: { id },
      include: {
        candidato: true,
        apoios: true,
        metas: true,
        propostas: true,
        realizacoes: true,
      },
    });
    return campaign;
  }

  async update(id: string, updateCampaignDto: UpdateCampaignDto) {
    await this.campaignsRepository.update(id, updateCampaignDto.biografia);
    return `Campanha atualizada com sucesso!`;
  }
}
