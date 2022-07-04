import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SequelizeModule } from '@nestjs/sequelize';
import { Estoque } from 'entities/models/estoque.model';
import { EstoqueService } from './estoque.service';

@Injectable()
export class CronService {
  connection = SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'desafio',
    models: [Estoque],
    synchronize: true,
  });

  constructor(private estoqueService: EstoqueService) {
    this.connection;
  }

  @Cron('45 * * * * *')
  async handleCron() {
    if (this.connection) {
      const estoques = await this.estoqueService.findAll();

      for (let i = 0; i < estoques.length; i++) {
        const estoque = estoques[i];

        await this.estoqueService.create(estoque);
      }
    }
  }
}
