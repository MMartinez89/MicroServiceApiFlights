import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PassengerMSG } from 'src/common/constants';

import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';

//Decorador de Swagger

@Controller()
export class PassengerController {
    constructor( private passengerService: PassengerService){

    }
    @MessagePattern(PassengerMSG.CREATE)
    create(@Payload() passengerDTO: PassengerDTO){
        return this.passengerService.create(passengerDTO);
    }
    @MessagePattern(PassengerMSG.FIND_ALL)
    findAll(){
        return this.passengerService.findAll();
    }
    @MessagePattern(PassengerMSG.FIND_ONE)
    findOne(@Payload() id:string){
        return this.passengerService.finOne(id);
    }
    @MessagePattern(PassengerMSG.UPDATE)
    update(@Payload() payload){
        return this.passengerService.update(payload.id, payload.passengerDTO)
    }
    @MessagePattern(PassengerMSG.DELETE)
    delete(@Payload() id: string){
        return this.passengerService.delete(id);
    }

}
