import { Expose } from "class-transformer";
import { IsInt, IsString } from "class-validator";
import { IsIn } from "sequelize-typescript";

export class CharacterDto {
    @Expose()
    @IsString()
    name: string;
    @Expose()
    @IsString()
    class: string;
    @Expose()
    @IsString()
    lore: string;
    @Expose()
    @IsString()
    skinDescription: string;
    @Expose()
    @IsInt()
    passiveSkill: number;
    @Expose()
    @IsInt()
    location: number;

    constructor(name: string, className: string, lore: string, skinDescription: string, passiveSkill: number, location: number) {
        this.name = name;
        this.class = className;
        this.lore = lore;
        this.skinDescription = skinDescription;
        this.passiveSkill = passiveSkill;
        this.location = location;
    }
}