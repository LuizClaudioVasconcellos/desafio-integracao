import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SequelizeModule } from '@nestjs/sequelize';
import { Categoria } from 'entities/models/categorias.model';
import { CategoriasService } from './categorias.service';

@Injectable()
export class CronService {
  connection = SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'desafio',
    models: [Categoria],
    synchronize: true,
  });

  constructor(private categoriaService: CategoriasService) {
    this.connection;
  }

  @Cron('45 * * * * *')
  async handleCron() {
    if (this.connection) {
      const categorias = await this.categoriaService.findAll();

      for (let i = 0; i < categorias.length; i++) {
        const categoria = categorias[i];

        await this.categoriaService.create(categoria);
      }
    }
  }
}
