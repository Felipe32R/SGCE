import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSupportDto {
  @IsString({ message: 'O título precisa ser válido.' })
  @IsNotEmpty({ message: 'O título não pode ser nulo.' })
  candidato: string;
  @IsString({ message: 'O texto precisa ser válido.' })
  @IsNotEmpty({ message: 'O texto não pode ser nulo.' })
  partido: string;
  @IsString({ message: 'campanhaId precisa ser string.' })
  @IsNotEmpty({ message: 'Precisa ter um campanhaId.' })
  campanhaId: string;
}
