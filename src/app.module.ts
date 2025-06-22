import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CharactersModule } from './characters/characters.module';
import 'dotenv/config';
import { Skill } from './skills/skill.model';
import { Character } from './characters/data/character.model';
import { GenerateCharacterModule } from './ai/generateCharacter.module';
import { LocationsModule } from './locations/locations.module';
import { Location } from './locations/data/location.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LocalStorageModule } from './localStorage/local-storage/local-storage.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      models: [Character, Skill, Location],
    }),
    
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads', 
    }),
    LocalStorageModule,            
    CharactersModule,
    GenerateCharacterModule,
    LocationsModule,
  ],
})
export class AppModule {}
