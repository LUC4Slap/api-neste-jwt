import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDTO } from './DTO/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('User')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  // @ApiSecurity('basic')
  @ApiOperation({
    summary: 'Cria Usuario',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario criado com sucesso',
    type: CreateUserDTO,
  })
  @Post()
  async createUser(@Body() data: CreateUserDTO): Promise<CreateUserDTO> {
    return await this.usersService.createUser(data);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Busca todos os usuarios',
  })
  @Get()
  async findAllUsers() {
    return await this.usersService.findAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Busca usuario pelo ID',
  })
  @Get(':id')
  async findUserById(@Param() id: string) {
    return await this.usersService.findUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Deleta um usuario pelo ID',
  })
  @Delete(':id')
  async deleteUser(@Param() id: string) {
    return await this.usersService.deleteUser(id);
  }
}
