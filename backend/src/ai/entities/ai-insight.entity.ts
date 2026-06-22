import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { Vehicle } from '../../vehicles/entities/vehicle.entity';

@Entity('ai_insights')
export class AiInsight {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Vehicle)
  vehicle: Vehicle;

  @Column()
  month: string;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  generatedAt: Date;
}
