import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reciepts')
export class RecieptEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  issuedAt: Date;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
}
