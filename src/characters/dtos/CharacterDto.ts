import { Expose, Type } from "class-transformer";
import { SkillDto } from "./SkillDto";

export class CharacterDto {
    @Expose()
    name: string;
    @Expose()
    class: string;
    @Expose()
    lore: string;
    @Expose()
    @Type(() => SkillDto)
    passiveSkill: SkillDto;
}