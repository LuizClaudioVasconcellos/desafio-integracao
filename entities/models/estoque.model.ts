import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Produto } from './produtos.model';

@Table
export class Estoque extends Model {
  @ForeignKey(() => Produto)
  @Column({
    type: DataType.INTEGER,
  })
  idProduto: number;

  @Column({
    type: DataType.INTEGER,
  })
  quantidade: number;

  @Column({
    type: DataType.INTEGER,
  })
  reserva: number;

  @Column({
    type: DataType.INTEGER,
  })
  status: number;
}
