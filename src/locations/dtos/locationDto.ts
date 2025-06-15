import { Expose } from "class-transformer";
import { IsInt, IsString, IsArray } from "class-validator";


export class LocationDto {
    @Expose()
    @IsInt()
    id: number;
    @Expose()
    @IsString()
    name: string;
    @Expose()
    @IsString()
    description: string;
    @Expose()
    @IsString()
    lore: string;
    @Expose()
    @IsArray()
    @IsInt({ each: true})
    characters?: number[];

    constructor(id: number, name: string, description: string, lore: string, characters?: number[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.lore = lore;
        this.characters = characters;
    }
}