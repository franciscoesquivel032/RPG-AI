export class LocationDto {
    id: number;
    name: string;
    description: string;
    lore: string;
    characters?: number[];

    constructor(id: number, name: string, description: string, lore: string, characters?: number[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.lore = lore;
        this.characters = characters;
    }
}