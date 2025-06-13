import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Location } from './data/location.model';
import { Character } from 'src/characters/data/character.model';

@Module({
  imports: [SequelizeModule.forFeature([Location, Character])],
  providers: [LocationsService],
  controllers: [LocationsController]
})
export class LocationsModule {}
