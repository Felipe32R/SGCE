import { PartialType } from '@nestjs/mapped-types';
import { CreateProposeDto } from './create-propose.dto';

export class UpdateProposeDto extends PartialType(CreateProposeDto) {}
