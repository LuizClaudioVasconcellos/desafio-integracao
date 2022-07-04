import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Categoria } from 'entities/models/categorias.model';
import { ProdutosService } from 'apps/produtos/src/produtos.service';
import { Produto } from 'entities/models/produtos.model';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel(Categoria)
    private categoriaModel: typeof Categoria,
  ) {}

  async findAll(): Promise<Categoria[]> {
    return this.categoriaModel.findAll();
  }

  findOne(id: number): Promise<Categoria> {
    return this.categoriaModel.findOne({
      where: {
        id,
      },
    });
  }

  async create(categoria: Categoria): Promise<Categoria> {
    return this.categoriaModel.create(categoria as any);
  }

  async update(id: number, newCategoria: Categoria): Promise<Categoria> {
    await this.categoriaModel.update(newCategoria, {
      where: {
        id,
      },
    });
    const categoria = this.findOne(id);
    return categoria;
  }

  async destroy(id: number): Promise<Categoria> {
    const categoria = await this.findOne(id);
    const produtoService = new ProdutosService(Produto);
    const produtos = await produtoService.findAll();

    produtos.map((produto) => {
      if (produto.idCategoria == categoria.id) {
        produtoService.update(produto.id, { idCategoria: null });
      }
    });

    await this.categoriaModel.destroy({
      where: {
        id,
      },
    });
    return categoria;
  }
}
