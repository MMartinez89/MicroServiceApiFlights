import { Injectable } from "@nestjs/common";
import {PassportStrategy} from '@nestjs/passport';
import { ExtractJwt,Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        //super() le envia informacion a la clase padre 
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SERCRET
        });
    }

    async validate(payLoad:any){
        return {
            userId: payLoad.sub,
            username: payLoad.username
        }
    }
}