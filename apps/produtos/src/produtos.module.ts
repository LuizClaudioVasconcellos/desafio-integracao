import { Produto } from 'entities/models/produtos.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron.service';

@Module({
  imports: [SequelizeModule.forFeature([Produto]), ScheduleModule.forRoot()],
  controllers: [ProdutosController],
  providers: [ProdutosService, CronService],
  exports: [SequelizeModule],
})
export class ProdutosModule {}
