import { Expose } from "class-transformer";

export class CharacterDto {
    @Expose()
    name: string;
    @Expose()
    class: string;
    @Expose()
    lore: string;
    @Expose()
    skinDescription: string;
    @Expose()
    passiveSkill: number;
    @Expose()
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