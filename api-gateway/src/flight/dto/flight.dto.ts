import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class FlightDTO{ 
    //Para documentar el campo en el swagger
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    pilot: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    airplane:string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    destinationCity: string;
    @ApiProperty()
    @IsNotEmpty()
    @Type(()=> Date)
    @IsDate()
    flightDate: Date;
}