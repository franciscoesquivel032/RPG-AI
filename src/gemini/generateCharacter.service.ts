import { Injectable } from '@nestjs/common';
import { AIService } from './aiService';
import { GenerateCharacterDto } from './dtos/generateCharacterDto';
import { plainToInstance } from 'class-transformer';
import { GenerateCharacterResponseDto } from './dtos/generateCharacterResponseDto';
import { buffer } from 'stream/consumers';

@Injectable()
export class GenerateCharacterService {
  constructor(private readonly aiService: AIService) {}

  async generateCharacterFromText(dto: GenerateCharacterDto): Promise<string> {
    const prompt = this.aiService.getTextToCharacterPrompt(dto);

    let character: GenerateCharacterResponseDto;
    try {
      const rawJson = await this.aiService.textToText(prompt);

      console.log('Raw JSON response:', rawJson); // Flag for debugging

      const cleanedJson = rawJson // Remove the code block markers and any leading/trailing whitespace
        .replace(/^```json\s*/i, '')
        .replace(/```$/, '')
        .trim();

      character = plainToInstance(GenerateCharacterResponseDto,JSON.parse(cleanedJson)); // Parse the cleaned JSON string into an object
    } catch (error) {
      console.error('Error generating character:', error);
      throw new Error(
        'Failed to generate character. Please check the input data and try again.',
      );
    }
    const response = JSON.stringify(character, null, 2); // Convert the character object to a formatted JSON string
    return response;
  }

  async generateImageFromCharacter(character: GenerateCharacterResponseDto): Promise<Buffer>{

    if(!character) 
        throw new Error('Character data is required to generate an image.'); 

    const prompt = this.aiService.getImageFromCharacterPrompt(character);

    let buffer: Buffer | null = null;
    try {
        buffer = await this.aiService.imageFromCharacterGemini(prompt);
    } catch (error) {
        console.error('Error generating image:', error);
        throw new Error(
            'Failed to generate image from AI. Please check the character data and try again.',
        );
    }

    return buffer;

  }
}
