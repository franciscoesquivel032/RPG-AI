import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Skill } from './data/skill.model';
import { Character } from './data/character.model';

@Module({
  imports: [SequelizeModule.forFeature([Skill]), Character],
  exports: [SequelizeModule],
})
export class SkillsModule {}
