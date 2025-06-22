import {
  Controller,
  Post,
  Get,
  HttpCode,
  HttpStatus,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
} from '@nestjs/common';
import { CharacterDto } from './dtos/CharacterDto';
import { CharactersService } from './characters.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage, diskStorage } from 'multer';
import { CharacterWithImageDto } from './dtos/CharacterWithImageDto';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post('create-no-image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return cb(
            new BadRequestException('Solo se permiten imágenes JPG/JPEG/PNG'),
            false,
          );
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() characterDto: CharacterDto, @UploadedFile() imageFile?: Express.Multer.File): Promise<CharacterWithImageDto> {
    const response = await this.charactersService.create(characterDto, imageFile);
    return response;
  }

  @Get('all')
  async findAll(): Promise<CharacterDto[]> {
    return await this.charactersService.findAll();
  }

  @Get('find:id')
  async findById(@Param('id') id: number): Promise<CharacterDto> {
    return await this.charactersService.findById(id);
  }

  @Put('put:id')
  async update(
    @Param('id') id: number,
    @Body() data: CharacterDto,
  ): Promise<CharacterDto> {
    return this.charactersService.update(id, data);
  }

  @Delete('delete:id')
  async delete(@Param('id') id: number): Promise<boolean> {
    return await this.charactersService.delete(id);
  }
}
