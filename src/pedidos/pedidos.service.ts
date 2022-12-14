import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prismaService/prisma.service';
import { CreatePedidoDTO } from './DTO/create-pedido.dto';

@Injectable()
export class PedidosService {
  constructor(private prisma: PrismaService) {}

  async create(pedido: CreatePedidoDTO) {
    return await this.prisma.pedido.create({ data: pedido });
  }

  async consultarPedidosPorData(data) {
    const { inicioData, fimData } = data;
    // const inicio = new Date(inicioData).getTime().toString();
    // const fim = new Date(fimData).getTime().toString();
    return await this.prisma.pedido.findMany({
      where: {
        created_at: {
          gte: new Date(inicioData),
          lte: new Date(fimData),
        },
      },
    });
  }

  async deletarPedido(id) {
    return await this.prisma.pedido.deleteMany({
      where: {
        id: Number(id.id),
      },
    });
  }
}
