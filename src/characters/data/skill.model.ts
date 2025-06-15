import { BelongsTo, HasOne, IsInt, Model } from 'sequelize-typescript';
import { AutoIncrement, Column, ForeignKey, PrimaryKey, Table } from "sequelize-typescript";
import { Character } from "./character.model";
import { on } from 'events';

@Table
export class Skill extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;

    @Column({ unique : true })
    declare name: string;

    @Column
    declare description: string;

    @Column
    declare effect: string;

    // Association with Character
    @ForeignKey(() => Character)
    @Column
    declare characterId: number;

    @BelongsTo(() => Character)
    declare character: Character;
}