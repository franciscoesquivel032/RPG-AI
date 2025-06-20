/*
            "name": "Nombre del personaje",
            "class": "Clase del personaje",
            "lore": "Historia del personaje",
            "skinDescription": "Descripción detallada de la apariencia del personaje basada en la descripción del personaje",
            "passiveSkill": {
                "name": "Nombre de la habilidad pasiva",
                "description": "Descripción de la habilidad pasiva"
                "effect": "Efecto de la habilidad pasiva"
            }
            "location": ${location.trim().length === 0 ? "Localización del personaje basada en los demás datos" : `"${location}"`}  
*/

import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";
import { SkillDto } from "src/skills/SkillDto";

export class GenerateCharacterResponseDto{
    @IsString()
    name: string;
    @IsString()
    class: string;
    @IsString()
    lore: string;
    @IsString()
    skinDescription: string;
    @ValidateNested()
    @Type(() => SkillDto)
    skillDto: SkillDto;
    @IsString()
    location: string;
}