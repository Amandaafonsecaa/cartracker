import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './entitites/expense.entity';
import { CreateExpenseDto } from './dto/expense.dto';

@Injectable()
export class ExpensesService {
    constructor(
        @InjectRepository(Expense)
        private readonly expensesRepository: Repository<Expense>,
    ) { }

    async create(dto: CreateExpenseDto): Promise<Expense> {
        const expense = this.expensesRepository.create({
            ...dto,
            vehicle: { id: dto.vehicleId },
        });

        return this.expensesRepository.save(expense);
    }

    async findAll(vehicleId: string, month?: string): Promise<Expense[]> {
        const query = this.expensesRepository
            .createQueryBuilder('expense')
            .where('expense.vehicleId = :vehicleId', { vehicleId });

        if (month) {
            query.andWhere("TO_CHAR(expense.date, 'YYYY-MM') = :month", { month });
        }

        return query.orderBy('expense.date', 'DESC').getMany();
    }
}
