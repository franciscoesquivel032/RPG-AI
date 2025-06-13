import { Module } from '@nestjs/common';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Character } from './data/character.model';
import { SkillsModule } from './skill.module';
import { LocationsModule } from 'src/locations/locations.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Character]),
    SkillsModule,
    LocationsModule
  ],
  controllers: [CharactersController],
  providers: [CharactersService]
})
export class CharactersModule {}
