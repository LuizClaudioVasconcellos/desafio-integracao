import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Categoria } from './categorias.model';

@Table
export class Produto extends Model {
  @ForeignKey(() => Categoria)
  @Column({
    type: DataType.INTEGER,
  })
  idCategoria: number;

  @Column({
    type: DataType.CHAR,
  })
  codigo: string;

  @Column({
    type: DataType.CHAR,
  })
  nome: string;

  @Column({
    type: DataType.TEXT,
  })
  descricao: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  valor: number;

  @Column({
    type: DataType.INTEGER,
  })
  status: number;
}
