import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePedidoDTO {
  @ApiProperty()
  @IsNotEmpty()
  cliente: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  endereco: string;

  @ApiProperty()
  @IsNotEmpty()
  pedido: string;

  @ApiProperty()
  @IsNotEmpty()
  telefone: string;
}
