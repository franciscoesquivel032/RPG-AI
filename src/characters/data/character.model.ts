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

  // Skill association
  @ForeignKey(() => Skill)
  @Column
  declare passiveSkillId: number;
  @BelongsTo(() => Skill, { as: 'passiveSkill' })
  declare passiveSkill: Skill;

  // Location association 
  @ForeignKey(() => Location)
  @Column
  declare locationId: number;
  @BelongsTo(() => Location, { as: 'location' })
  declare location: Location;
}
