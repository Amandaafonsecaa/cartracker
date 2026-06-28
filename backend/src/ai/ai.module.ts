import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiInsight } from './entities/ai-insight.entity';
import { Refueling } from '../refuelings/entities/refueling.entity';
import { Expense } from '../expenses/entitites/expense.entity';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';

@Module({
    imports: [TypeOrmModule.forFeature([AiInsight, Refueling, Expense])],
    controllers: [AiController],
    providers: [AiService],
})
export class AiModule { }