import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      //variables de entorno 
      envFilePath:['.env.development'],
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.URI_MONGODB,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    ,UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
