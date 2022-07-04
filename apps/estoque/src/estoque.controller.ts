import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { Estoque } from 'entities/models/estoque.model';
import { EstoqueService } from './estoque.service';

@Controller('produtos')
export class EstoqueController {
  constructor(private readonly estoqueService: EstoqueService) {}

  @Get(':id/estoque')
  findOne(@Param() params): Promise<Estoque> {
    return this.estoqueService.findOne(params.id);
  }

  @Patch(':id/estoque')
  update(@Param() params, @Body() estoque: Estoque): Promise<Estoque> {
    return this.estoqueService.update(params.id, estoque);
  }

  @Delete(':id/estoque')
  @HttpCode(HttpStatus.NOT_IMPLEMENTED)
  destroyMessage() {
    return;
  }
}
