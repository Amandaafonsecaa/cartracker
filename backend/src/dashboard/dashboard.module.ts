import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Refueling } from '../refuelings/entities/refueling.entity';
import { Expense } from '../expenses/entities/expense.entity';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
    imports: [TypeOrmModule.forFeature([Refueling, Expense])],
    controllers: [DashboardController],
    providers: [DashboardService],
})
export class DashboardModule { }