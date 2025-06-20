import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Skill } from './skill.model';
import { Character } from '../characters/data/character.model';
import { SkillService } from './skill.service';

@Module({
  imports: [SequelizeModule.forFeature([Skill]), Character],
  providers: [SkillService],
  exports: [SkillService, SequelizeModule.forFeature([Skill])],
})
export class SkillsModule {}
