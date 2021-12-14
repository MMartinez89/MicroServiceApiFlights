import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFlight } from 'src/common/interface/flight.interface';
import { FLIGHT } from 'src/common/models/models';
import { flightDTO } from './dto/flight.dto';
import axios from 'axios';
import * as moment from 'moment';
import { ILocation } from 'src/common/interface/location.interface';
import { IWeather } from 'src/common/interface/weather.location';

@Injectable()
export class FlightService {
    constructor(@InjectModel(FLIGHT.name) private readonly model:Model<IFlight>){

    }

    async getLocation(destinationCity:string): Promise<ILocation>{
        const {data} = await axios.get(`https://www.metaweather.com/api/location/search/?query=${destinationCity}`);
        return data[0];
    }

    async getWeather(woeid:number, flightDate:Date):Promise<IWeather[]>{
        const dateFormat = moment.utc(flightDate).format();

        const year = dateFormat.substring(0, 4);
        const month = dateFormat.substring(6, 7);
        const day = dateFormat.substring(9, 10);

        const {data} = await axios.get(`https://www.metaweather.com/api/location/${woeid}/${year}/${month}/${day}`);
        console.log(data)

        return data[0];
    }

    assing({_id,pilot,airplane,destinationCity,flightDate,passengers}:IFlight, weather:IWeather[]): IFlight{
        return Object.assign({_id,pilot,airplane,destinationCity,flightDate,passengers, weather})
    }

    async create(flightDTO:flightDTO): Promise<IFlight>{
        const newFlight = new this.model(flightDTO);
        return await newFlight.save();
    }

    async findAll():Promise<IFlight[]>{
        return await this.model.find().populate('passengers');
    }

    async finOne(id:string): Promise<IFlight>{
        const flight = await this.model.findById(id).populate('passengers');
        const location: ILocation = await this.getLocation(flight.destinationCity);
        const weather: IWeather[] = await this.getWeather(location.woeid, flight.flightDate)
        return this.assing(flight, weather);
    }
    async update(id: string, flightDTO:flightDTO): Promise<IFlight>{
        return await this.model.findByIdAndUpdate(id, flightDTO,{new:true})
    }
    async delete(id:string){
       await this.model.findByIdAndDelete(id);
       return {
           status: HttpStatus.OK,
           msg: 'Deleted'
        } 
    }
    async addPassenger(flightId:string, passengerId:string):Promise<IFlight>{ //$addToSet se para no agregar si no para sustituir, 
                                                                              //por ejemplo si ID existe no lo agrege si no lo sustituya
       return await this.model.findByIdAndUpdate(flightId,{$addToSet:{passengers:passengerId}},{new:true}).populate('passengers'); //populate es el plugin instalado para poder retornar la informacion del pasajero
    }


}
