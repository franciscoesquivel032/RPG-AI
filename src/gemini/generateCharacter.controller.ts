import { Body, Controller, Post } from "@nestjs/common";
import { GenerateCharacterService } from "./generateCharacter.service";
import { GenerateCharacterDto } from "./dtos/generateCharacterDto";
import { GenerateCharacterResponseDto } from "./dtos/generateCharacterResponseDto";

@Controller('ai')
export class GenerateCharacterController {
    constructor(
        private readonly generateCharacterService: GenerateCharacterService
    ){}

    @Post('generate-text')
    async generateCharacterFromText(@Body() dto: GenerateCharacterDto): Promise<string> {
        return this.generateCharacterService.generateCharacter(dto);
    }
}