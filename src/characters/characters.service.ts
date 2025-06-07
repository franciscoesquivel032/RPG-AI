import { Delete, Get, Injectable, NotFoundException, Post, Put } from '@nestjs/common';
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

  private async getPlainCharacter(id: number): Promise<CharacterDto> {
  const charWithSkill = await this.findCharWithSkill(id);
    const plainChar = charWithSkill?.toJSON();
    return plainToInstance(CharacterDto, plainChar, {
      excludeExtraneousValues: true,
    });
}

  private async findCharWithSkill(id: number): Promise<Character | null> {
    return this.characterModel.findByPk(id, {
      include: [{ model: Skill, as: 'passiveSkill' }],
    });
  }

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

  async findAll(): Promise<CharacterDto[]> {
    const characters: Character[] = await this.characterModel.findAll({
      include: [{ model: Skill, as: 'passiveSkill' }],
    });
    console.log(characters.toString())
    return Promise.all(characters.map((char) =>
      this.getPlainCharacter(char.id)
    ));
  }

  async findById(id: number): Promise<CharacterDto> {
    const character: Character | null = await this.characterModel.findByPk(id, {
      include: [{ model: Skill, as: 'passiveSkill' }],
    });
    if (!character) {
      throw new NotFoundException(`> Character with id ${id} not found`);
    }
    return this.getPlainCharacter(character.id);
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
    // Actualizar personaje
    const [count, [updatedCharacter]] = await this.characterModel.update(
      characterDto,
      {
        where: { id },
        returning: true,
      },
    );

    if (count === 0) {
      throw new NotFoundException(`Character with id ${id} not found`);
    }

    return this.findById(id);
  }
}


