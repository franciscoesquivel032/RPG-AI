import { Module } from '@nestjs/common';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Character } from './data/character.model';
import { SkillsModule } from '../skills/skill.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Character]),
    SkillsModule,
  ],
  controllers: [CharactersController],
  providers: [CharactersService],
  exports: [CharactersModule, CharactersService],
})
export class CharactersModule {}
