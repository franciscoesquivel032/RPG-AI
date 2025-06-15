import { Body, Controller, Post } from "@nestjs/common";
import { GenerateCharacterService } from "./generateCharacter.service";

@Controller('ai')
export class GenerateCharacterController {
    constructor(
        private readonly generateCharacterService: GenerateCharacterService
    ){}

    @Post('generate')
    async generateCharacter(
        @Body('worldDescription') worldDescription: string,
        @Body('characterDescription') characterDescription: string,
        @Body('locationId') locationId: number,
    ): Promise<string> {
        return this.generateCharacterService.generateCharacter(worldDescription, characterDescription, locationId);
    }
}