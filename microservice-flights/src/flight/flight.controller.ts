import { Controller} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FlightMSG } from 'src/common/constants';

import { flightDTO } from './dto/flight.dto';
import { FlightService } from './flight.service';


@Controller()
export class FlightController {
    constructor(private readonly flightService: FlightService){

    }

    @MessagePattern(FlightMSG.CREATE)
    create(@Payload() flightDTO: flightDTO){
        return this.flightService.create(flightDTO)
    }
    @MessagePattern(FlightMSG.FIND_ALL)
    findAll(){
        return this.flightService.findAll();
    }
    @MessagePattern(FlightMSG.FIND_ONE)
    finOne(@Payload() id: string){
        return this.flightService.finOne(id);
    }
    @MessagePattern(FlightMSG.UPDATE)
    update(@Payload() payLoad){
        return this.flightService.update(payLoad.id, payLoad.flightDTO);
    }
    @MessagePattern(FlightMSG.DELETE)
    delete(@Payload() id:string){
        return this.flightService.delete(id);
    }
    @MessagePattern(FlightMSG.ADD_PASSENGER)
    async addPassenger(@Payload() payLoad){

        return this.flightService.addPassenger(payLoad.flightId, payLoad.passengerId);
    }
}
