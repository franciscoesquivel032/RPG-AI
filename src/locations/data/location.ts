import { AutoIncrement, Column, Model, PrimaryKey } from "sequelize-typescript";

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
}