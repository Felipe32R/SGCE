import { IsNotEmpty, IsString } from 'class-validator';
export class CreateCampaignDto {
  @IsString({ message: 'O email precisa ser válido.' })
  @IsNotEmpty({ message: 'O email não pode ser nulo.' })
  biografia: string;
  @IsString({ message: 'candidatoId precisa ser string.' })
  @IsNotEmpty({ message: 'Precisa ter um candidatoId.' })
  candidatoId: string;
}
