import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prismaService/prisma.service';
import { CreateUserDTO } from './DTO/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDTO): Promise<CreateUserDTO> {
    const userExists = await this.verifyUser(data);
    if (userExists) {
      throw new NotFoundException(
        `Usuario com E-mail: ${data.email} já existe`,
      );
    }
    // eslint-disable-next-line prefer-const
    let { name, email, password } = data;
    const nexUser: CreateUserDTO = {
      name,
      email,
      password: bcrypt.hashSync(password, 8),
    };
    return await this.prisma.user.create({ data: nexUser });
  }

  async findAllUsers(): Promise<CreateUserDTO[]> {
    return await this.prisma.user.findMany();
  }

  async findUserById(id): Promise<CreateUserDTO> {
    const idParser = { ...id };
    return await this.prisma.user.findUnique({
      where: {
        id: parseInt(idParser.id),
      },
    });
  }

  async deleteUser(id) {
    const idParser = { ...id };
    return await this.prisma.user.delete({
      where: {
        id: parseInt(idParser.id),
      },
    });
  }

  async login(email) {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async verifyUser(data: CreateUserDTO) {
    const userExist = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (userExist) {
      return true;
    }
    return false;
  }
}
