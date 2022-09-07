import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDTO } from './DTO/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(@Body() data: CreateUserDTO) {
    return await this.usersService.createUser(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllUsers() {
    return await this.usersService.findAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findUserById(@Param() id: string) {
    return await this.usersService.findUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param() id: string) {
    return await this.usersService.deleteUser(id);
  }
}
