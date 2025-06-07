import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Skill } from './skill.model';

@Table
export class Character extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;
  @Column
  declare name: string;
  @Column
  declare class: string;
  @Column
  declare lore: string;
  @ForeignKey(() => Skill)
  @Column
  declare passiveSkillId: number;
  @BelongsTo(() => Skill, { as: 'passiveSkill' })
  declare passiveSkill: Skill;
}
