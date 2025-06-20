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
        const prompt = this.aiService.getTextToCharacterPrompt(dto);

        let character: GenerateCharacterResponseDto;
        try {
            const rawJson = await this.aiService.textToText(prompt);
            character = plainToInstance(GenerateCharacterResponseDto, JSON.parse(rawJson));
        } catch (error) {
            console.error("Error generating character:", error);
            throw new Error("Failed to generate character. Please check the input data and try again.");
        }
        const response = JSON.stringify(character, null, 2);
        return response;
    }

}
