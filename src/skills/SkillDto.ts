import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class SkillDto {
  @Expose()
  @IsString()
  name: string;
  @Expose()
  @IsString()
  description: string;
  @Expose()
  @IsString()
  effect: string;

  constructor(name: string, description: string, effect: string) {
    this.name = name;
    this.description = description;
    this.effect = effect;
  }
}
