import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { Vehicle } from '../../vehicles/entities/vehicle.entity';

@Entity('refuelings')
export class Refueling {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Vehicle)
  vehicle: Vehicle;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  currentKm: number;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  liters: number;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  pricePerLiter: number;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  totalCost: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  kmPerLiter: number;

  @Column({ nullable: true })
  gasStation: string;

  @CreateDateColumn()
  createdAt: Date;
}
