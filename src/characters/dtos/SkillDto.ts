import { Expose } from "class-transformer";

export class SkillDto {
  @Expose()
  name: string;
  @Expose()
  description: string;
  @Expose()
  effect: string;
}
