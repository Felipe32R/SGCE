import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { CandidatesRepository } from 'src/shared/database/repositories/candidates.repositories';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly candidatesRepo: CandidatesRepository,
    private readonly jwtService: JwtService,
  ) {}
  async signin(signinDto: SigninDto) {
    const { email, senha } = signinDto;
    const candidate = await this.candidatesRepo.findUnique({
      where: { email },
    });

    if (!candidate) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const isPasswordValid = await compare(senha, candidate.senha);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const accessToken = await this.generateAccessToken(candidate.id);

    return { accessToken };
  }

  async signup(signupDto: SignupDto) {
    const { email, senha } = signupDto;
    const emailTaken = await this.candidatesRepo.findUnique({
      where: { email },
      select: { id: true },
    });

    if (emailTaken) {
      throw new ConflictException('Este email já está em uso.');
    }

    const hashedPassword = await hash(senha, 12);

    const candidate = await this.candidatesRepo.create({
      data: { ...signupDto, senha: hashedPassword },
    });

    const accessToken = await this.generateAccessToken(candidate.id);

    return { accessToken };
  }

  private generateAccessToken(candidateId: string) {
    return this.jwtService.signAsync({ sub: candidateId });
  }
}
