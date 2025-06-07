import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Skill } from './data/skill.model';

@Module({
  imports: [SequelizeModule.forFeature([Skill])],
  exports: [SequelizeModule],
})
export class SkillsModule {}
