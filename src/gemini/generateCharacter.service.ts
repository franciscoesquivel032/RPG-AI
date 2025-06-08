import { Injectable } from "@nestjs/common";
import { AIService } from "./aiService";


@Injectable()
export class GenerateCharacterService {
    constructor(
        private readonly aiService: AIService,
    ){}

    async generateCharacter(worldDescription : string, characterDescription: string) : Promise<string>{
        const prompt = this.getPrompt(worldDescription, characterDescription);
        const response = await this.aiService.sendPrompt(prompt);
        return response;
    }

    getPrompt(worldDescription: string, characterDescription: string) : string {
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
            "passiveSkill": {
                "name": "Nombre de la habilidad pasiva",
                "description": "Descripción de la habilidad pasiva"
                "effect": "Efecto de la habilidad pasiva"
            }          
        }
        No utilices nombres de personajes ya existentes, amolda el personaje a la descripción del mundo y a la descripción del personaje fielmente.
        Responde únicamente con el JSON, sin ningún texto adicional.`;

        return PROMPT;
        
    }
}
