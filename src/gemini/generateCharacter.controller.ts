import { Body, Controller, Post } from "@nestjs/common";
import { GenerateCharacterService } from "./generateCharacter.service";

@Controller()
export class GenerateCharacterController {
    constructor(
        private readonly generateCharacterService: GenerateCharacterService
    ){}

    @Post('generate')
    async generateCharacter(
        @Body('worldDescription') worldDescription: string,
        @Body('characterDescription') characterDescription: string
    ): Promise<string> {
        return this.generateCharacterService.generateCharacter(worldDescription, characterDescription);
    }
}