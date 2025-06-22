import { Body, Controller, Post, Res } from '@nestjs/common';
import { GenerateCharacterService } from './generateCharacter.service';
import { GenerateCharacterDto } from './dtos/generateCharacterDto';
import { GenerateCharacterResponseDto } from './dtos/generateCharacterResponseDto';
import { Response } from 'express';

@Controller('ai')
export class GenerateCharacterController {
  constructor(
    private readonly generateCharacterService: GenerateCharacterService,
  ) {}

  @Post('generate-text')
  async generateCharacterFromText(
    @Body() dto: GenerateCharacterDto,
  ): Promise<string> {
    return this.generateCharacterService.generateCharacterFromText(dto);
  }

  @Post('generate-image')
  async generateImageFromCharacter(@Body() character: GenerateCharacterResponseDto, @Res() res: Response): Promise<void> {
    try {
      const buffer = await this.generateCharacterService.generateImageFromCharacter(character);

      if (!buffer) {
        res.status(500).send('Error generating image from character');
        return;
      }

      res.set({
        'Content-Type': 'image/png',
        'Content-Length': buffer.length,
      });

      res.end(buffer);
    } catch (error) {
      console.error('Error sending image:', error);
      res.status(500).send('Internal Server Error: Failed to generate image');
    }
  }
}
