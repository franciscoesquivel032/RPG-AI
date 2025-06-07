import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class GenerateCharacterService {
    private readonly API_KEY = process.env.GEMINI_API_KEY;
    private readonly API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.API_KEY}`;

    async generateCharacter(worldDescription : string, characterDescription: string) : Promise<string>{
        try {
            const response = await axios.post(this.API_URL, {
                contents: [
                    {
                        parts: [{ text: this.getPrompt(worldDescription, characterDescription) }],
                    },
                ],
            });
            return response.data.candidates?.[0]?.content?.parts?.[0]?.text;
        } catch (error) {
            console.error("Error generating character: ", error);
            throw new Error("Error while generating character with AI");
        }
    }

    getPrompt(worldDescription: string, characterDescription: string) : string {
        const PROMPT = 
        `Genera un personaje de rol basado en la siguiente descripción del mundo:
        ${worldDescription} 
        y la descripción del personaje: 
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
