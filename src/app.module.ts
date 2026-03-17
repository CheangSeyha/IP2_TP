import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RecieptModule } from './modules/reciept/reciept.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecieptEntity } from './Entity/reciept.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RecieptModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [RecieptEntity],
        synchronize: true,
        extra: {
          asyncStackTraces: true,
        },
      }),
    }),
  ],
})
export class AppModule {}
