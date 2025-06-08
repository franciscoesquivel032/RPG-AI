import { Module } from '@nestjs/common';
import { GenerateCharacterController } from './generateCharacter.controller';
import { GenerateCharacterService } from './generateCharacter.service';
import { AIService } from './aiService';

@Module({
  controllers: [GenerateCharacterController],
  providers: [AIService, GenerateCharacterService],
})
export class GenerateCharacterModule {}
