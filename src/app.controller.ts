import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import {
  ApiBody,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginUserDTO } from './swegger/login-user.dto';
import { LoginRequestDTO } from './swegger/login-requeste.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @ApiTags('Login')
  @ApiBody({ type: LoginRequestDTO })
  @ApiOperation({
    summary: 'Faz o login',
  })
  @ApiResponse({
    status: 201,
    description: 'Login efetuado com sucesso',
    type: LoginUserDTO,
  })
  @Post('auth/login')
  async login(@Request() req): Promise<any> {
    return this.authService.login(req.body);
  }
}
