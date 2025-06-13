import { AutoIncrement, Column, HasMany, Model, PrimaryKey } from "sequelize-typescript";
import { Character } from "src/characters/data/character.model";

export class Location extends Model {
    @Column
    @PrimaryKey
    @AutoIncrement
    declare id: number;
    @Column
    declare name: string;
    @Column
    declare description: string;
    @Column
    declare lore: string;
    @HasMany(() => Character, { 
        as: 'characters',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
     })
    declare characters: Character[];
}