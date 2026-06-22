import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { Vehicle } from '../../vehicles/entities/vehicle.entity';

@Entity('expenses')
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Vehicle)
  vehicle: Vehicle;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  amount: number;

  @Column()
  category: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;
}
