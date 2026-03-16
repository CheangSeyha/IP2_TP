import { Controller, Get, Post, Patch, Delete, Param } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { RecieptService } from './reciept.service';
import { RecieptCreateDto } from './dto/create-recietpt.dto';
import { UpdateRecieptDto } from './dto/update-reciept.dto';
@Controller('reciept')
export class RecieptController {
  constructor(private readonly recieptService: RecieptService) {}

  @Get()
  findAll() {
    return this.recieptService.findAll();
  }

  @Post()
  create(@Body() Dto: RecieptCreateDto) {
    return this.recieptService.create(Dto);
  }

  @Patch(':id')
  update(@Param('id') recieptId: string, @Body() Dto: UpdateRecieptDto) {
    return this.recieptService.update(recieptId, Dto);
  }

  @Delete(':id')
  remove(@Param('id') recieptId: string) {
    return this.recieptService.remove(recieptId);
  }
}
