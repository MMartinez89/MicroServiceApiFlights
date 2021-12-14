import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
//@ts-ignore
import { MongooseModule } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { UserSchema } from './schema/user.schema';

@Module({
  imports:[
    //configurar el modulo de usuario para la bd
    MongooseModule.forFeatureAsync([{
      //nombre del modelo
      name: USER.name,
      useFactory:()=>{
        return UserSchema
      }
    }])
  
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
