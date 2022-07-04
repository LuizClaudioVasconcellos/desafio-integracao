import { Categoria } from 'entities/models/categorias.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron.service';

@Module({
  imports: [SequelizeModule.forFeature([Categoria]), ScheduleModule.forRoot()],
  controllers: [CategoriasController],
  providers: [CategoriasService, CronService],
  exports: [SequelizeModule],
})
export class CategoriasModule {}
