import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SequelizeModule } from '@nestjs/sequelize';
import { Produto } from 'entities/models/produtos.model';
import { ProdutosService } from './produtos.service';

@Injectable()
export class CronService {
  connection = SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'desafio',
    models: [Produto],
    synchronize: true,
  });

  constructor(private produtosService: ProdutosService) {
    this.connection;
  }

  @Cron('45 * * * * *')
  async handleCron() {
    if (this.connection) {
      const produtos = await this.produtosService.findAll();

      for (let i = 0; i < produtos.length; i++) {
        const produto = produtos[i];

        await this.produtosService.create(produto);
      }
    }
  }
}
