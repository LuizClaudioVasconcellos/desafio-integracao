import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EstoqueService } from 'apps/estoque/src/estoque.service';
import { Estoque } from 'entities/models/estoque.model';
import { Produto } from 'entities/models/produtos.model';
import { response } from 'express';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectModel(Produto)
    private produtoModel: typeof Produto,
  ) {}

  async findAll(): Promise<Produto[]> {
    return this.produtoModel.findAll();
  }

  findOne(id: number): Promise<Produto> {
    return this.produtoModel.findOne({
      where: {
        id,
      },
    });
  }

  async findByCode(codigo: string): Promise<Produto> {
    const product = this.produtoModel.findOne({
      where: {
        codigo,
      },
    });

    return product;
  }

  async create(produto: Produto): Promise<any> {
    const produtoExist = await this.findByCode(produto.codigo);
    const estoqueService = new EstoqueService(Estoque);

    if (produtoExist) {
      response.send('Já existe um produto com este código');
    }

    const newProduto = await this.produtoModel.create(produto as any);

    await estoqueService.create({
      idProduto: newProduto.id,
      quantidade: 0,
      reserva: 0,
      status: 1,
    });

    return newProduto;
  }

  async update(id: number, newProduto: any): Promise<Produto> {
    await this.produtoModel.update(newProduto, {
      where: {
        id,
      },
    });
    const produto = this.findOne(id);
    return produto;
  }

  async destroy(id: number): Promise<Produto> {
    const produto = await this.findOne(id);
    const estoqueService = new EstoqueService(Estoque);
    const estoque = await estoqueService.findAll();

    estoque.map((estoqueDelete) => {
      if (estoqueDelete.idProduto == produto.id) {
        estoqueService.destroy(estoqueDelete.idProduto);
      }
    });

    await this.produtoModel.destroy({
      where: {
        id,
      },
    });

    return produto;
  }
}
