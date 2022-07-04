import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Categoria } from 'entities/models/categorias.model';
import { CategoriasService } from './categorias.service';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriaService: CategoriasService) {}

  @Get()
  findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  findOne(@Param() params): Promise<Categoria> {
    return this.categoriaService.findOne(params.id);
  }

  @Post()
  create(@Body() categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.create(categoria);
  }

  @Patch(':id')
  update(@Param() params, @Body() categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.update(params.id, categoria);
  }

  @Delete(':id')
  destroy(@Param() params): Promise<Categoria> {
    return this.categoriaService.destroy(params.id);
  }
}
