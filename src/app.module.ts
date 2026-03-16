import { Module } from '@nestjs/common';
import { RecieptModule } from './modules/reciept/reciept.module';
@Module({
  imports: [RecieptModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
