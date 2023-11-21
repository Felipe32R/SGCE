import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSocialDto {
  @IsString({ message: 'O nome precisa ser válido.' })
  @IsNotEmpty({ message: 'O nome não pode ser nulo.' })
  nome: string;
  @IsString({ message: 'O liknk precisa ser válido.' })
  @IsNotEmpty({ message: 'O liknk não pode ser nulo.' })
  link: string;
  @IsString({ message: 'candidatoId precisa ser string.' })
  @IsNotEmpty({ message: 'Precisa ter um candidatoId.' })
  candidatoId: string;
}
