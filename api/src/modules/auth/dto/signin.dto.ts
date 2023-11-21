import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SigninDto {
  @IsString({ message: 'O email precisa ser válido.' })
  @IsNotEmpty({ message: 'O email não pode ser nulo.' })
  @IsEmail()
  email: string;
  @IsString({ message: 'A senha precisa ser um texto.' })
  @IsNotEmpty({ message: 'A senha não pode ser nula.' })
  @MinLength(8)
  senha: string;
}
