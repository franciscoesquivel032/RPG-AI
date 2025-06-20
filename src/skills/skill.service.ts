import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Skill } from "./skill.model";
import { SkillDto } from "./SkillDto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class SkillService {
    constructor(
        @InjectModel(Skill)
        private skillModel: typeof Skill,
    ){}

    async findByPk(id: number): Promise<SkillDto | null> {
        const skill = await this.skillModel.findByPk(id);
        if (!skill) {
            return null;
        }
        return plainToInstance(SkillDto, skill);
    }

    async create(data: SkillDto): Promise<SkillDto> {
        const skill = await this.skillModel.findOne({
            where:{
                name: data.name,
                description: data.description,
                effect: data.effect 
            }
        });

        if(skill){
            throw new Error(`Skill already exists with name: ${data.name}`);
        }
        const newSkill = await this.skillModel.create({
            name: data.name,
            description: data.description,
            effect: data.effect
        });

        return plainToInstance(SkillDto, newSkill);
    }
}