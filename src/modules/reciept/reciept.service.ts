import { Injectable } from '@nestjs/common';
import { RecieptCreateDto } from './dto/create-recietpt.dto';
import { UpdateRecieptDto } from './dto/update-reciept.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RecieptEntity } from 'src/Entity/reciept.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { Repository } from 'typeorm';
@Injectable()
export class RecieptService {
  constructor(
    @InjectRepository(RecieptEntity)
    private readonly recieptRepo: Repository<RecieptEntity>,
    private readonly notificationsService: NotificationsService,
  ) {}

  findAll() {
    return this.recieptRepo.find();
  }

  async create(Dto: RecieptCreateDto) {
    const reciept = this.recieptRepo.create({
      issuedAt: new Date(Dto.issuedAt),
      name: Dto.name,
      price: Dto.price,
    });
    return this.recieptRepo.save(reciept);
  }

  async update(recieptId: string, Dto: UpdateRecieptDto) {
    const reciept = await this.recieptRepo.findOneBy({ id: recieptId });
    if (!reciept) throw new Error('Receipt not found');
    if (Dto.issuedAt !== undefined) reciept.issuedAt = new Date(Dto.issuedAt);
    if (Dto.name !== undefined) reciept.name = Dto.name;
    if (Dto.price !== undefined) reciept.price = Dto.price;
    return this.recieptRepo.save(reciept);
  }

  async remove(recieptId: string) {
    const reciept = await this.recieptRepo.findOneBy({ id: recieptId });
    if (!reciept) throw new Error('Receipt not found');
    await this.recieptRepo.remove(reciept);
    return { delete: true, recieptId };
  }
}
