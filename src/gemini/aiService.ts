import { Injectable } from '@nestjs/common';
import { GoogleGenAI, Modality } from '@google/genai';
import { GenerateCharacterResponseDto } from './dtos/generateCharacterResponseDto';
import { GenerateCharacterDto } from './dtos/generateCharacterDto';


/**
 * Service to interact with the Gemini AI API for generating character content.
 */
@Injectable()
export class AIService {
  private readonly API_KEY: string = process.env.GEMINI_API_KEY || 'NO API KEY';
  private readonly AI = new GoogleGenAI({ apiKey: this.API_KEY });

  /**
   * Generates text content based on the provided prompt using the Gemini AI API.
   * @param prompt - The input text prompt to generate content from.
   * @returns A promise that resolves to the generated text.
   */
  async textToText(prompt: string): Promise<string> {
    let response;
    try {
      response = await this.AI.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
      });
    } catch (error) {
      console.error('Error generating content:', error);
      throw new Error(
        'Failed to generate content from the AI. Please check the prompt and try again.',
      );
    }
    return response.text ?? 'No text response available';
  }

  getTextToCharacterPrompt(dto: GenerateCharacterDto) : string {
        const PROMPT = 
        `Genera un personaje de rpg basado en la siguiente descripción del mundo:
        ${dto.worldDescription} 
        si la descripción del mundo es una descripción de un videojuego, una serie o una película, utiliza la descripción del mundo como base para crear un personaje que encaje en ese universo.
        Utiliza la siguiente descripción del personaje:
        ${dto.characterDescription}.
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
            "location": ${(dto.location ?? "").trim().length === 0 ? "Localización del personaje basada en los demás datos, genera simplemente el nombre de la localización, por ejemplo: 'Ciudad dorada de Luthria' o 'Bosques del este de Sirk" : `"${dto.location}"`}  
        }
        No utilices nombres de personajes o localizaciones ya existentes, amolda el personaje a la descripción del mundo y a la descripción del personaje fielmente.
        Responde únicamente con el objeto JSON. 
        ES CRUCIAL QUE RESPONDAS SIN USAR COMILLAS TRIPLES, SIN USAR ETIQUETAS ${'```json'} Y SIN NINGÚN TEXTO ADICIONAL FUERA DEL JSON.`;

        return PROMPT;
        
    }

  /**
   * Generates an image based on the provided character data using the Gemini AI API.
   * @param character - The character data to generate an image from.
   * @returns A promise that resolves to a Buffer containing the generated image.
   */
  async imageFromCharacter(character: GenerateCharacterResponseDto,): Promise<Buffer | null> {
    let buffer: Buffer | null = null;

    if (!character)
      throw new Error('Character data is required to generate an iamge.');

    const prompt = getImageFromCharacterPrompt(character);

    try {
      const response = await this.AI.models.generateContent({
        model: 'gemini-2.0-flash-preview-image-generation',
        contents: prompt,
        config: {
          responseModalities: [Modality.TEXT, Modality.IMAGE],
        },
      });

      if (!response || !response.candidates || response.candidates.length === 0) {
        throw new Error('No candidates found in the AI response.');
      }

      const imageBuffer = this.extractImageBuffer(response);

      if (!imageBuffer) {
        throw new Error('No image data found in the response.');
      }

      buffer = imageBuffer;
    } catch (error) {
      console.error('Error generating image:', error);
      throw new Error('Failed to generate image from AI. Please check the prompt and try again.');
    }

    return buffer;
  }

  /**
   * Extracts the image buffer from the AI response.
   * @param response - The response object from the AI API.
   * @returns A Buffer containing the image data, or null if no image data is found.
   */
  private extractImageBuffer(response: any): Buffer | null {
    let result: Buffer | null = null;
    const parts = response?.candidates?.[0]?.content?.parts;

    if (!parts) {
      throw new Error('No content parts found in the AI response.');
    }

    for (const part of parts) {
      if (part.inlineData?.data && typeof part.inlineData.data === 'string') {
        result = Buffer.from(part.inlineData.data, 'base64');
      }

      if (part.text) {
        console.log('Aditional text of the model:', part.text);
      }
    }

    return result;
  }
}

/**
 * Constructs a prompt for generating an image of a character based on the provided character data.
 * @param character - The character data to base the image on.
 * @returns A string prompt for the AI to generate an image.
 */
function getImageFromCharacterPrompt(character: GenerateCharacterResponseDto) {
  const prompt: string = `Crea una imagen de un personaje de RPG basándote fielmente en la siguiente descripción:
    Nombre: ${character.name}
    Clase: ${character.class}
    Historia: ${character.lore}
    Descripción de la apariencia: ${character.skinDescription}
    Habilidad pasiva: ${character.skillDto.name} - ${character.skillDto.description}
    Localización: ${character.location}`;

  return prompt;
}
