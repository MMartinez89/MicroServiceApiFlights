import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDTO } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.auth.guard';

@ApiTags('Authentication')
@Controller('api/v2/auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}
    
    @UseGuards(LocalAuthGuard)
    @Post('signin')
    async signIn(@Req() req){
        return await this.authService.singIn(req.user);
        //console.log(req)
    }

    @Post('signup')
    async singUp(@Body() userDto:UserDTO){
        return await this.authService.singUp(userDto);
    }
}
