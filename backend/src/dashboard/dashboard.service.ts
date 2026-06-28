import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Refueling } from '../refuelings/entities/refueling.entity';
import { Expense } from '../expenses/entities/expense.entity';

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(Refueling)
        private readonly refuelingsRepository: Repository<Refueling>,
        @InjectRepository(Expense)
        private readonly expensesRepository: Repository<Expense>,
    ) { }

    async getSummary(vehicleId: string, month: string) {
        const refuelings = await this.refuelingsRepository
            .createQueryBuilder('r')
            .where('r.vehicleId = :vehicleId', { vehicleId })
            .andWhere("TO_CHAR(r.date, 'YYYY-MM') = :month", { month })
            .getMany();

        const expenses = await this.expensesRepository
            .createQueryBuilder('e')
            .where('e.vehicleId = :vehicleId', { vehicleId })
            .andWhere("TO_CHAR(e.date, 'YYYY-MM') = :month", { month })
            .getMany();

        const totalRefuelings = refuelings.reduce(
            (sum, r) => sum + Number(r.totalCost),
            0,
        );

        const totalExpenses = expenses.reduce(
            (sum, e) => sum + Number(e.amount),
            0,
        );

        const totalMonth = totalRefuelings + totalExpenses;

        const avgKmPerLiter =
            refuelings.length > 0
                ? refuelings.reduce((sum, r) => sum + Number(r.kmPerLiter), 0) /
                refuelings.length
                : 0;

        const kmDriven =
            refuelings.length > 1
                ? refuelings[0].currentKm -
                refuelings[refuelings.length - 1].currentKm
                : 0;

        const costPerKm =
            kmDriven > 0 ? Number((totalMonth / kmDriven).toFixed(2)) : 0;

        const expensesByCategory = expenses.reduce(
            (acc, e) => {
                acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
                return acc;
            },
            {} as Record<string, number>,
        );

        return {
            month,
            totalMonth: Number(totalMonth.toFixed(2)),
            totalRefuelings: Number(totalRefuelings.toFixed(2)),
            totalExpenses: Number(totalExpenses.toFixed(2)),
            avgKmPerLiter: Number(avgKmPerLiter.toFixed(2)),
            kmDriven,
            costPerKm,
            expensesByCategory,
        };
    }
}