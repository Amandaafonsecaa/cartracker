import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Injectable()
export class VehiclesService {
    constructor(
        @InjectRepository(Vehicle)
        private readonly vehiclesRepository: Repository<Vehicle>,
    ) { }

    async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
        const vehicle = this.vehiclesRepository.create(createVehicleDto);
        return this.vehiclesRepository.save(vehicle);
    }

    async findAll(): Promise<Vehicle[]> {
        return this.vehiclesRepository.find();
    }

    async findOne(id: string): Promise<Vehicle> {
        return this.vehiclesRepository.findOneOrFail({ where: { id } });
    }

    async update(
        id: string,
        updateData: Partial<CreateVehicleDto>,
    ): Promise<Vehicle> {
        await this.vehiclesRepository.update(id, updateData);
        return this.findOne(id);
    }
}
