import { Injectable } from "@nestjs/common";
import { AIService } from "./aiService";
import { GenerateCharacterDto } from "./dtos/generateCharacterDto";
import { plainToInstance } from "class-transformer";
import { GenerateCharacterResponseDto } from "./dtos/generateCharacterResponseDto";


@Injectable()
export class GenerateCharacterService {
    constructor(
        private readonly aiService: AIService
    ){}

    async generateCharacter(dto : GenerateCharacterDto) : Promise<string>{
        const prompt = this.getPrompt(dto.worldDescription, dto.characterDescription, dto.location ?? "");
        const rawJson = await this.aiService.textToText(prompt);

        let character: GenerateCharacterResponseDto;
        try {
            character = plainToInstance(GenerateCharacterResponseDto, JSON.parse(rawJson));
        } catch (error) {
            console.error("Error parsing JSON response:", error);
            throw new Error("Failed to parse the AI response. Please ensure the AI is returning valid JSON.");
        }
        const response = JSON.stringify(character, null, 2);
        return response;
    }

    getPrompt(worldDescription: string, characterDescription: string, location: string) : string {
        const PROMPT = 
        `Genera un personaje de rpg basado en la siguiente descripción del mundo:
        ${worldDescription} 
        si la descripción del mundo es una descripción de un videojuego, una serie o una película, utiliza la descripción del mundo como base para crear un personaje que encaje en ese universo.
        Utiliza la siguiente descripción del personaje:
        ${characterDescription}.
        El personaje debe tener un nombre, una clase, una historia y una habilidad pasiva. Deberás devolver un JSON con las siguientes propiedades:
        {
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
        }
        No utilices nombres de personajes ya existentes, amolda el personaje a la descripción del mundo y a la descripción del personaje fielmente.
        Responde únicamente el JSON, sin ningún texto adicional.`;

        return PROMPT;
        
    }
}
