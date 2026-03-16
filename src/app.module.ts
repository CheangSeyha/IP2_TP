import { Module } from '@nestjs/common';
import { RecieptModule } from './modules/reciept/reciept.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecieptEntity } from './Entity/reciept.entity';
@Module({
  imports: [
    RecieptModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'tp2',
      entities: [RecieptEntity],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
