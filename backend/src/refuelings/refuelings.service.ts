import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Refueling } from './entities/refueling.entity';
import { CreateRefuelingDto } from './dto/refueling.dto';

@Injectable()
export class RefuelingsService {
    constructor(
        @InjectRepository(Refueling)
        private readonly refuelingsRepository: Repository<Refueling>,
    ) { }

    async create(dto: CreateRefuelingDto): Promise<Refueling> {
        // Último abastecimento do veículo
        const lastRefueling = await this.refuelingsRepository.findOne({
            where: { vehicle: { id: dto.vehicleId } },
            order: { createdAt: 'DESC' },
        });
        // Cálculo do km/litro
        const kmPerLiter = lastRefueling
            ? (dto.currentKm - lastRefueling.currentKm) / dto.liters
            : 0;

        // Cálculo do custo total do abastecimento
        const totalCost = dto.liters * dto.pricePerLiter;

        // Criação do abastecimento
        const refueling = this.refuelingsRepository.create({
            ...dto,
            vehicle: { id: dto.vehicleId },
            kmPerLiter: Number(kmPerLiter.toFixed(2)),
            totalCost: Number(totalCost.toFixed(2)),
        });

        return this.refuelingsRepository.save(refueling);
    }

    async findAll(vehicleId: string): Promise<Refueling[]> {
        return this.refuelingsRepository.find({
            where: { vehicle: { id: vehicleId } },
            order: { date: 'DESC' },
        });
    }

    async getLastPrice(vehicleId: string): Promise<number | null> {
        const last = await this.refuelingsRepository.findOne({
            where: { vehicle: { id: vehicleId } },
            order: { createdAt: 'DESC' },
        });

        return last ? Number(last.pricePerLiter) : null;
    }
}
