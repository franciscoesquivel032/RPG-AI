import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';
import { Skill } from '../../skills/skill.model';
import { Location } from 'src/locations/data/location.model';

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
  @Column
  declare skinDescription: string;
  @Column
  declare location: string;


  // Skill association
  @HasOne(() => Skill, { as: 'passiveSkill', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare passiveSkill: Skill;
}
