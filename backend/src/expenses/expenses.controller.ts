import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/expense.dto';

@Controller('expenses')
export class ExpensesController {
    constructor(private readonly expensesService: ExpensesService) { }

    @Post()
    create(@Body() dto: CreateExpenseDto) {
        return this.expensesService.create(dto);
    }

    @Get()
    findAll(
        @Query('vehicleId') vehicleId: string,
        @Query('month') month?: string,
    ) {
        return this.expensesService.findAll(vehicleId, month);
    }
}
