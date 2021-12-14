import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMSG } from 'src/common/constants';
import {UserDTO} from './dto/user.dto'
import { UserService } from './user.service';

//Decorador de Swagger
@Controller()
export class UserController {
    constructor(private userService:UserService){

    }
    @MessagePattern(UserMSG.CREATE)
    create(@Payload() userDTO: UserDTO){
        return this.userService.create(userDTO)
    }
    @MessagePattern(UserMSG.FIND_ALL)
    findAll(){
        return this.userService.findAll();
    }
    @MessagePattern(UserMSG.FIND_ONE)
    findOne(@Payload() id:string ){
        return this.userService.findOne(id);
    }
    @MessagePattern(UserMSG.UPDATE)
    update(@Payload() payLoad: any){
        return this.userService.update(payLoad.id, payLoad.serDTO)
    }

    @MessagePattern(UserMSG.DELETE)
    delete(@Payload() id:string){
        return this.userService.delete(id);
    }

    @MessagePattern(UserMSG.VALID_USER)
    async validateUser(@Payload() payLoad){
        const user = await this.userService.findByUsername(payLoad.username);
        const isValidPassword =  await this.userService.checkPassword(payLoad.password, user.password);
        if(user && isValidPassword){
            return user
        }
        return null
    }

}
