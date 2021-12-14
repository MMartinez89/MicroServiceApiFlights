import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { RabbitMQ } from "../constants";



@Injectable()
export class ClientProxySuperFlights{
  
    constructor(private readonly config: ConfigService){
        
    }

   

 //Estancia para las cola de usuarios
    clientProxyUsers():ClientProxy{
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options:{
                urls: this.config.get('AMQP_URL'),
                queue: RabbitMQ.UserQueue
            }
        });
    }
//Estancia para las cola pasajeros
    clientProxyPassenger():ClientProxy{
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options:{
                urls: this.config.get('AMQP_URL'),
                queue: RabbitMQ.PassengerQueue
            }
        })
    }
//Estancia para las cola vuelos
    clientProxyFlight():ClientProxy{
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options:{
                urls: this.config.get('AMQP_URL'),
                queue: RabbitMQ.FlightQueue            }
        })
    }
}