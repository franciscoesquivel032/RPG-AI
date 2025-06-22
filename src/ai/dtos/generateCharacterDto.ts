import { IsOptional, IsString } from 'class-validator';

export class GenerateCharacterDto {
  @IsString()
  worldDescription: string;

  @IsString()
  characterDescription: string;

  @IsOptional()
  location?: string;
}
