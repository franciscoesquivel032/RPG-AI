import { Injectable } from '@nestjs/common';
import { Location } from './data/location.model'; 

@Injectable()
export class LocationsService {

async findByPk(id: number): Promise<Location | null>{
    const location = await Location.findByPk(id);
    if (!location) {
        return null;
    }
    return location;
}

}
