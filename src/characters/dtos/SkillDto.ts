import { Expose } from "class-transformer";

export class SkillDto {
  @Expose()
  name: string;
  @Expose()
  description: string;
  @Expose()
  effect: string;

  constructor(name: string, description: string, effect: string) {
    this.name = name;
    this.description = description;
    this.effect = effect;
  }
}
