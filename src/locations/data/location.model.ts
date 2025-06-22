import { AutoIncrement, Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Character } from "src/characters/data/character.model";

@Table
export class Location extends Model<Location> {
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;
    @Column
    declare name: string;
    @Column
    declare description: string;
    @Column
    declare lore: string;
}