import { Controller, Post, Get, HttpCode, HttpStatus, Body, Param, Put, Delete } from '@nestjs/common';
import { CharacterDto } from './dtos/CharacterDto';
import { CharactersService } from './characters.service';


@Controller('characters')
export class CharactersController {

    constructor(private readonly charactersService : CharactersService) {}

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() characterDto : CharacterDto){
        const response = await this.charactersService.create(characterDto);
        return response;
    }

    @Get('all')
    async findAll() : Promise<CharacterDto[]>{
        return await this.charactersService.findAll();
    }

    @Get('find:id')
    async findById(@Param('id') id : number) : Promise<CharacterDto>{
        return await this.charactersService.findById(+id);
    }

    @Put('put:id')
    async update(@Param('id') id : number, @Body() data : CharacterDto) : Promise<CharacterDto>{
        return this.charactersService.update(+id, data);
    }

    @Delete('delete:id')
    async delete (@Param('id') id : number) : Promise<boolean>{
        return await this.charactersService.delete(+id);
    }
}
