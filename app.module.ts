import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriasController } from 'apps/categorias/src/categorias.controller';
import { CategoriasModule } from 'apps/categorias/src/categorias.module';
import { CategoriasService } from 'apps/categorias/src/categorias.service';
import { EstoqueController } from 'apps/estoque/src/estoque.controller';
import { EstoqueModule } from 'apps/estoque/src/estoque.module';
import { EstoqueService } from 'apps/estoque/src/estoque.service';
import { ProdutosController } from 'apps/produtos/src/produtos.controller';
import { ProdutosModule } from 'apps/produtos/src/produtos.module';
import { ProdutosService } from 'apps/produtos/src/produtos.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'docker',
      database: 'desafio',
      autoLoadModels: true,
      synchronize: true,
    }),
    CategoriasModule,
    ProdutosModule,
    EstoqueModule,
  ],
  controllers: [CategoriasController, ProdutosController, EstoqueController],
  providers: [CategoriasService, ProdutosService, EstoqueService],
})
export class AppModule {}
