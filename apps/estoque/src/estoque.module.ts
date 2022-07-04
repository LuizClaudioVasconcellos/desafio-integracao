import { Estoque } from 'entities/models/estoque.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { EstoqueService } from './estoque.service';
import { EstoqueController } from './estoque.controller';
import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [SequelizeModule.forFeature([Estoque]), ScheduleModule.forRoot()],
  controllers: [EstoqueController],
  providers: [EstoqueService, CronService],
  exports: [SequelizeModule],
})
export class EstoqueModule {}
