import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Character } from './data/character.model';
import { CharacterDto } from './dtos/CharacterDto';
import { plainToInstance } from 'class-transformer';
import { Skill } from './data/skill.model';

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Character)
    private characterModel: typeof Character,

    @InjectModel(Skill)
    private skillModel: typeof Skill,
  ) {}

  /**
   * Converts a Character instance to a plain object and transforms it into a CharacterDto.
   * @param id
   * @returns  {Promise<CharacterDto>} A promise that resolves to a CharacterDto object.
   * @throws NotFoundException if the character with the given id does not exist.
   */
  private async getPlainCharacter(id: number): Promise<CharacterDto> {
    const charWithSkill = await this.findCharWithSkill(id);
    const plainChar = charWithSkill?.toJSON();
    return plainToInstance(CharacterDto, plainChar, {
      excludeExtraneousValues: true,
    });
  }

  /**
   *  Finds a character by its ID and includes its passive skill.
   * @param id 
   * @returns  {Promise<Character | null>} A promise that resolves to a Character instance or null if not found.
   */
  private async findCharWithSkill(id: number): Promise<Character | null> {
    return this.characterModel.findByPk(id, {
      include: [{ model: Skill, as: 'passiveSkill' }],
    });
  }

  /**
   * Creates a new character with the provided data.
   * @param data - The data for the new character.
   * @returns {Promise<CharacterDto>} A promise that resolves to the created CharacterDto.
   * @throws NotFoundException if a character with the same name and lore already exists.
   */
  async create(data: CharacterDto): Promise<CharacterDto> {
    // Check if character exists
    const charExists = await this.characterModel.findOne({
      where: { name: data.name, lore: data.lore },
    });
    if (charExists) {
      throw new NotFoundException(
        `Character with name "${data.name}" already exists`,
      );
    }

    // get passive skill, check if it exists or create a new one
    const { passiveSkill, ...characterData } = data;
    let passiveSkillId: number | undefined;

    if (passiveSkill) {
      const [skillInstance, created] = await this.skillModel.findOrCreate({
        where: { name: passiveSkill.name },
        defaults: {
          description: passiveSkill.description,
          effect: passiveSkill.effect,
        },
      });
      passiveSkillId = skillInstance.id;
    }

    // Create character
    const char = await this.characterModel.create(
      {
        ...characterData,
        passiveSkillId: passiveSkillId,
      },
      {
        include: [{ model: Skill, as: 'passiveSkill' }],
      },
    );

    // Get the plain object with its relations and return it in JSON
    return this.getPlainCharacter(char.id);
  }

  /**
   * Retrieves all characters from the database.
   * @returns {Promise<CharacterDto[]>} A promise that resolves to an array of CharacterDto objects.
   */
  async findAll(): Promise<CharacterDto[]> {
    const characters: Character[] = await this.characterModel.findAll({
      include: [{ model: Skill, as: 'passiveSkill' }],
    });
    console.log(characters.toString());
    return Promise.all(
      characters.map((char) => this.getPlainCharacter(char.id)),
    );
  }

  
 
  /**
   * Retrieves a character by its ID.
   * @param id - The ID of the character to retrieve.
   * @returns {Promise<CharacterDto>} A promise that resolves to the CharacterDto object.
   * @throws NotFoundException if the character with the given ID does not exist.
   */
  async findById(id: number): Promise<CharacterDto> {
    const char = await this.findCharWithSkill(id);
    if (!char) {
      throw new NotFoundException(`Character with id ${id} not found`);
    }
    return this.getPlainCharacter(char.id);
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
