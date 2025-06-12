import { Body, Controller, Post } from "@nestjs/common";
import { GenerateCharacterService } from "./generateCharacter.service";

@Controller('ai')
export class GenerateCharacterController {
    constructor(
        private readonly generateCharacterService: GenerateCharacterService
    ){}

    @Post('generateCharacter')
    async generateCharacter(
        @Body('worldDescription') worldDescription: string,
        @Body('characterDescription') characterDescription: string
    ): Promise<string> {
        return this.generateCharacterService.generateCharacter(worldDescription, characterDescription);
    }
}