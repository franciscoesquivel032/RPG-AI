import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Character } from './data/character.model';
import { CharacterDto } from './dtos/CharacterDto';
import { plainToInstance } from 'class-transformer';
import { Skill } from '../skills/skill.model';
import { SkillService } from '../skills/skill.service';

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Character)
    private characterModel: typeof Character,

    private skillService: SkillService,
  ) {}

  /**
   * Creates a new character with the provided data.
   * @param data - The data for the new character.
   * @returns {Promise<CharacterDto>} A promise that resolves to the created CharacterDto.
   * @throws NotFoundException if a character with the same name and lore already exists.
   */
async create(data: CharacterDto): Promise<CharacterDto> {
  // Verify if character already exits
  const charExists = await this.characterModel.findOne({
    where: { name: data.name, lore: data.lore },
  });
  if (charExists) {
    throw new NotFoundException(
      `Character with name "${data.name}" already exists`,
    );
  }

  // Verify if passive skill and location exist
  const skill = await this.skillService.findByPk(data.passiveSkill);
  if (!skill) {
    throw new NotFoundException(`Skill with id ${data.passiveSkill} not found`);
  }

  // Create character
  const character = await this.characterModel.create({
    name: data.name,
    class: data.class,
    lore: data.lore,
    skinDescription: data.skinDescription,
    passiveSkillId: data.passiveSkill,
    location: data.location,
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
