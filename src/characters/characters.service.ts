import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(data: CharacterDto): Promise<CharacterDto> {
    // Char exists?
    const charExists = await this.characterModel.findOne({ where: { name: data.name, lore: data.lore } });
    if (charExists) {
      throw new NotFoundException(`Character with name "${data.name}" already exists`);
    }

    // Get passiveSkill and save it if doesn't exists
    const { passiveSkill, ...characterData } = data;
    const char = await this.characterModel.create(characterData);

    if (passiveSkill) {
      let passiveSkillInstance = await this.skillModel.findOne({
        where: { name: passiveSkill.name },
      });

      if (!passiveSkillInstance) {
        passiveSkillInstance = await this.skillModel.create({
          ...passiveSkill,
        });
      }

      if (passiveSkillInstance && passiveSkillInstance.id !== undefined) {
        char.passiveSkillId = passiveSkillInstance.id;
      }

      await char.save();
    }

    const charWithRelations = await this.characterModel.findByPk(char.id, {
      include: [{ model: Skill, as: 'passiveSkill' }],
    });

    const plainChar = charWithRelations?.toJSON();
    console.log(plainChar);

    return plainToInstance(CharacterDto, plainChar, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<CharacterDto[]> {
    const characters: Character[] = await this.characterModel.findAll({
      include: ['passiveSkill'],
    });
    return characters.map((character) =>
      plainToInstance(CharacterDto, character, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async findById(id: number): Promise<CharacterDto> {
    const character: Character | null = await this.characterModel.findByPk(id, {
      include: ['passiveSkill'],
    });
    if (!character) {
      throw new NotFoundException(`> Character with id ${id} not found`);
    }
    return plainToInstance(CharacterDto, character);
  }

  async delete(id: number): Promise<boolean> {
    // Buscar personaje para obtener passiveSkillId
    const character = await this.characterModel.findByPk(id);

    if (!character) {
      throw new NotFoundException(`Character with id ${id} not found`);
    }

    // Borrar skill pasiva si existe
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
