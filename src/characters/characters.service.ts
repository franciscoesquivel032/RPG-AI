import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Character } from './data/character.model';
import { CharacterDto } from './dtos/CharacterDto';
import { plainToInstance } from 'class-transformer';
import { Skill } from './data/skill.model';
import { Location } from 'src/locations/data/location.model';

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Character)
    private characterModel: typeof Character,

    @InjectModel(Skill)
    private skillModel: typeof Skill,

    @InjectModel(Location)
    private locationModel: typeof Location,
  ) {}

  /**
   * Creates a new character with the provided data.
   * @param data - The data for the new character.
   * @returns {Promise<CharacterDto>} A promise that resolves to the created CharacterDto.
   * @throws NotFoundException if a character with the same name and lore already exists.
   */
async create(data: CharacterDto): Promise<CharacterDto> {
  // Verificar duplicado
  const charExists = await this.characterModel.findOne({
    where: { name: data.name, lore: data.lore },
  });
  if (charExists) {
    throw new NotFoundException(
      `Character with name "${data.name}" already exists`,
    );
  }

  // Verificar que existan la skill y la location referenciadas
  const skill = await this.skillModel.findByPk(data.passiveSkill);
  if (!skill) {
    throw new NotFoundException(`Skill with id ${data.passiveSkill} not found`);
  }

  const location = await this.locationModel.findByPk(data.location);
  if (!location) {
    throw new NotFoundException(
      `Location with id ${data.location} not found`,
    );
  }

  // Crear personaje con las claves foráneas correctas
  const character = await this.characterModel.create({
    name: data.name,
    class: data.class,
    lore: data.lore,
    skinDescription: data.skinDescription,
    passiveSkillId: data.passiveSkill,
    locationId: data.location,
  });

  return plainToInstance(CharacterDto, character);
}


  /**
   * Retrieves all characters from the database.
   * @returns {Promise<CharacterDto[]>} A promise that resolves to an array of CharacterDto objects.
   */
  async findAll(): Promise<CharacterDto[]> {
    const characters = await this.characterModel.findAll({
      include: [ 
        { model: Skill, as: 'passiveSkill' },
        { model: Location, as: 'location' },
      ],
    });
    return plainToInstance(CharacterDto, characters);
  }

  
 
  /**
   * Retrieves a character by its ID.
   * @param id - The ID of the character to retrieve.
   * @returns {Promise<CharacterDto>} A promise that resolves to the CharacterDto object.
   * @throws NotFoundException if the character with the given ID does not exist.
   */
  async findById(id: number): Promise<CharacterDto> {
    const char = await this.characterModel.findOne({
      where: { id },
      include: [
        { model: Skill, as: 'passiveSkill' },
        { model: Location, as: 'location' },
      ],
    });

    if (!char) {
      throw new NotFoundException(`Character with id ${id} not found`);
    }
    
    return plainToInstance(CharacterDto, char);
  }

  async delete(id: number): Promise<boolean> {
    const character = await this.characterModel.findByPk(id);

    if (!character) {
      throw new NotFoundException(`Character with id ${id} not found`);
    }

    if (character.passiveSkillId) {
      await this.skillModel.destroy({
        where: { id: character.passiveSkillId },
      });
    }

    const n = await this.characterModel.destroy({ where: { id } });

    return n > 0;
  }

  async update(id: number, characterDto: CharacterDto): Promise<CharacterDto> {
    const [count] = await this.characterModel.update(characterDto, {
      where: { id },
      returning: true,
    });

    if (count === 0) {
      throw new NotFoundException(`Character with id ${id} not found`);
    }

    return this.findById(id);
  }
}
