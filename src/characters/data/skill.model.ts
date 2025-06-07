import { Model } from 'sequelize-typescript';
import { AutoIncrement, Column, ForeignKey, PrimaryKey, Table } from "sequelize-typescript";
import { Character } from "./character.model";

@Table
export class Skill extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    declare id: number;

    @Column({ unique : true })
    name!: string;

    @Column
    description!: string;

    @Column
    effect!: string;
}