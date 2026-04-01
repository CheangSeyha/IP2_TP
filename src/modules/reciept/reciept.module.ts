import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecieptController } from './reciept.controller';
import { RecieptService } from './reciept.service';
import { RecieptEntity } from 'src/Entity/reciept.entity';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([RecieptEntity]), NotificationsModule],
  controllers: [RecieptController],
  providers: [RecieptService],
})
export class RecieptModule {}
