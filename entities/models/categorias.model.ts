import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Categoria extends Model {
  @Column({
    type: DataType.CHAR,
  })
  codigo: string;

  @Column({
    type: DataType.CHAR,
  })
  titulo: string;

  @Column({
    type: DataType.INTEGER,
  })
  status: number;
}
