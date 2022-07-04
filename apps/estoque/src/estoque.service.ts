import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Estoque } from 'entities/models/estoque.model';

@Injectable()
export class EstoqueService {
  constructor(
    @InjectModel(Estoque)
    private estoqueModel: typeof Estoque,
  ) {}

  async findAll(): Promise<Estoque[]> {
    return this.estoqueModel.findAll();
  }

  findOne(id: number): Promise<Estoque> {
    return this.estoqueModel.findOne({
      where: {
        id,
      },
    });
  }

  async create({ quantidade, reserva, status }: any): Promise<Estoque> {
    const estoqueZero = this.estoqueModel.create({
      quantidade,
      reserva,
      status,
    });
    return estoqueZero;
  }

  async update(id: number, newEstoque: Estoque): Promise<Estoque> {
    await this.estoqueModel.update(newEstoque, {
      where: {
        id,
      },
    });
    const estoque = this.findOne(id);
    return estoque;
  }

  async destroy(idProduto: number): Promise<Estoque> {
    const estoque = this.findOne(idProduto);
    await this.estoqueModel.destroy({
      where: {
        idProduto,
      },
    });
    return estoque;
  }

  async destroyMessage() {
    return;
  }
}
