import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Produto } from 'entities/models/produtos.model';
import { ProdutosService } from './produtos.service';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtoService: ProdutosService) {}

  @Get()
  findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Get(':id')
  findOne(@Param() params): Promise<Produto> {
    return this.produtoService.findOne(params.id);
  }

  @Post()
  create(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.create(produto);
  }

  @Patch(':id')
  update(@Param() params, @Body() produto: Produto): Promise<Produto> {
    return this.produtoService.update(params.id, produto);
  }

  @Delete(':id')
  destroy(@Param() params): Promise<Produto> {
    return this.produtoService.destroy(params.id);
  }
}
