import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { UserMSG } from 'src/common/constants';
import { IUser } from 'src/common/interface/user.interface';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { UserDTO } from './dto/user.dto';

@ApiTags('users')
@UseGuards(JwtAuthGuard) //Proteccion de rutas
@Controller('api/v2/user')
export class UserController {
    constructor(private readonly clientProxy: ClientProxySuperFlights){

    }
    
    private _clientProxiUser = this.clientProxy.clientProxyUsers();

   // async onApplicationBootstrap() { await this._clientProxiUser.connect();}

    @Post()
    create(@Body() userDto:UserDTO):Observable<IUser>{
        return this._clientProxiUser.send(UserMSG.CREATE, userDto);
    }

    @Get()
    findAll():Observable<IUser[]>{
        return this._clientProxiUser.send(UserMSG.FIND_ALL,'');
    }

    @Get(':id')
     findOne(@Param('id') id:string):Observable<IUser>{
        return this._clientProxiUser.send(UserMSG.FIND_ONE, id)
    }

    @Put(':id')
    update(@Param('id') id:string, userDTO:UserDTO):Observable<IUser>{
        return this._clientProxiUser.send(UserMSG.UPDATE,{id, userDTO})
    }

    @Delete(':id')
    delete(@Param('id') id:string ):Observable<any>{
        return this._clientProxiUser.send(UserMSG.DELETE, id)    }
}
