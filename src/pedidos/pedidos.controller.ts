import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePedidoDTO } from './DTO/create-pedido.dto';
import { PedidosService } from './pedidos.service';

@Controller('pedidos')
@ApiTags('Pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @ApiOperation({
    summary: 'Cria um Pedido',
  })
  @ApiResponse({
    status: 200,
    description: 'Pedido criado com sucesso',
    type: CreatePedidoDTO,
  })
  @Post()
  async createPeido(@Body() pedido: CreatePedidoDTO) {
    return await this.pedidosService.create(pedido);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Retorna pedidos apartir de uma data' })
  @ApiQuery({ name: 'fimData' })
  @ApiQuery({ name: 'inicioData' })
  @ApiResponse({
    status: 200,
    description: 'Consulta feita com sucesso',
    type: CreatePedidoDTO,
  })
  @Get()
  async consultarPedidosPorData(@Query() data) {
    return await this.pedidosService.consultarPedidosPorData(data);
  }
}
