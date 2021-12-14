import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserMSG } from 'src/common/constants';
import { ClientProxySuperFlights } from 'src/common/proxy/client-proxy';
import { UserDTO } from 'src/user/dto/user.dto';
//import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(private readonly clientProxy:ClientProxySuperFlights, private readonly jwtService: JwtService){

    }

    private _clienProxyUser = this.clientProxy.clientProxyUsers();

   /* async onApplicationBootstrap() {
         await this._clienProxyUser.connect();
     }*/
    
    async validateUser(username: string, password: string): Promise<any>{
        const user = await this._clienProxyUser.send(UserMSG.VALID_USER,{username, password}).toPromise();
        if(user){
            return user
        }
        return null
    }

    async singIn(user:any){
        const payload = {
            username: user.username,
            sub: user._id
        }
       //let token = {access_token: this.jwtService.sign(payload)};
      // let token = await this.jwtService.sign(payload);
      // console.log(token)
       // return  {access_token: token};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async singUp(userDTO:UserDTO){
       return await this._clienProxyUser.send(UserMSG.CREATE, userDTO).toPromise();
    }
}
