import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsString({ message: 'O nome precisa ser um texto.' })
  @IsNotEmpty({ message: 'O nome não pode ser nulo.' })
  nome: string;
  @IsString({ message: 'O email precisa ser válido.' })
  @IsNotEmpty({ message: 'O email não pode ser nulo.' })
  @IsEmail()
  email: string;
  @IsString({ message: 'O partido precisa ser um texto.' })
  @IsNotEmpty({ message: 'O partido não pode ser nulo.' })
  partido: string;
  @IsNotEmpty({ message: 'O número não pode ser nulo.' })
  numero: number;
  @IsString({ message: 'A senha precisa ser um texto.' })
  @IsNotEmpty({ message: 'A senha não pode ser nula.' })
  @MinLength(8)
  senha: string;
  @IsNotEmpty()
  cargoId: string;
}
