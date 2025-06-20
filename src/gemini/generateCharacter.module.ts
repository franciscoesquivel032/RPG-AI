import { Module } from '@nestjs/common';
import { GenerateCharacterController } from './generateCharacter.controller';
import { GenerateCharacterService } from './generateCharacter.service';
import { AIService } from './aiService';
import { CharactersModule } from 'src/characters/characters.module';
import { SkillsModule } from 'src/skills/skill.module';

@Module({
  imports: [CharactersModule, SkillsModule],
  controllers: [GenerateCharacterController],
  providers: [AIService, GenerateCharacterService],
})
export class GenerateCharacterModule {}
