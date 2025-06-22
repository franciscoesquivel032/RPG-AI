import { Expose } from "class-transformer";
import { IsInt, IsString } from "class-validator";

export class CharacterWithImageDto {
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
    @IsString()
    location: string;
    @Expose()
    @IsString()
    imagePath: string;

    constructor(name: string, className: string, lore: string, skinDescription: string, passiveSkill: number, location: string, imagePath: string) {
        this.name = name;
        this.class = className;
        this.lore = lore;
        this.skinDescription = skinDescription;
        this.passiveSkill = passiveSkill;
        this.location = location;
        this.imagePath = imagePath;
    }
}