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
import { Skill } from './skill.model';
import { Location } from 'src/locations/data/location.model';
import { on } from 'events';

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
  @HasOne(() => Skill, { as: 'passiveSkill', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare passiveSkill: Skill;

  // Location association 
  @ForeignKey(() => Location)
  @Column
  declare locationId: number;
  @BelongsTo(() => Location, { as: 'location', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  declare location: Location;
}
