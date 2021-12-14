import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FLIGHT, PASSENGER } from 'src/common/models/models';
import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';
import { FlightSchema } from './schema/flight.schema';
import { PassengerSchema } from './schema/passenger.schema';

@Module({
  imports:[
    MongooseModule.forFeatureAsync([
      {
        //Este puglings se usa àra cuando se retorne el pasajero traiga tpda ña informacion del pasajero y no solo su ID 
        name: FLIGHT.name,
        useFactory:() => FlightSchema.plugin(require('mongoose-autopopulate')),
      },
      {
        //Este puglings se usa àra cuando se retorne el pasajero traiga tpda ña informacion del pasajero y no solo su ID 
        name: PASSENGER.name,
        useFactory:() => PassengerSchema,
      }
    ])
  ],
  controllers: [FlightController],
  providers: [FlightService]
})
export class FlightModule {}
