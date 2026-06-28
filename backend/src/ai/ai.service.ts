import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AiInsight } from './entities/ai-insight.entity';
import { Refueling } from '../refuelings/entities/refueling.entity';
import { Expense } from '../expenses/entitites/expense.entity';

@Injectable()
export class AiService {
    constructor(
        @InjectRepository(AiInsight)
        private readonly insightsRepository: Repository<AiInsight>,
        @InjectRepository(Refueling)
        private readonly refuelingsRepository: Repository<Refueling>,
        @InjectRepository(Expense)
        private readonly expensesRepository: Repository<Expense>,
    ) { }

    async getInsight(vehicleId: string, month: string): Promise<AiInsight> {
        const existing = await this.insightsRepository.findOne({
            where: { vehicle: { id: vehicleId }, month },
        });

        if (existing) return existing;

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
        const avgKmPerLiter =
            refuelings.length > 0
                ? refuelings.reduce((sum, r) => sum + Number(r.kmPerLiter), 0) /
                refuelings.length
                : 0;

        const prompt = `
      Você é um assistente de controle de gastos de carro.
      Analise os dados abaixo e gere um insight curto, amigável e útil em português.
      Máximo 3 frases.

      Mês: ${month}
      Total gasto com combustível: R$${totalRefuelings.toFixed(2)}
      Total gasto com outros gastos: R$${totalExpenses.toFixed(2)}
      Total gasto no mês: R$${(totalRefuelings + totalExpenses).toFixed(2)}
      Média de consumo: ${avgKmPerLiter.toFixed(2)} km/l
      Número de abastecimentos: ${refuelings.length}
    `;

        const response = await fetch(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'llama3-8b-8192',
                    messages: [{ role: 'user', content: prompt }],
                    max_tokens: 200,
                }),
            },
        );

        const data = await response.json() as {
            choices: { message: { content: string } }[];
        };

        const content = data.choices[0].message.content;

        const insight = this.insightsRepository.create({
            vehicle: { id: vehicleId },
            month,
            content,
        });

        return this.insightsRepository.save(insight);
    }
}