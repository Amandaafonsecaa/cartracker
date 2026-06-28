import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateRefuelingDto {
    @IsString()
    vehicleId: string;

    @IsDateString()
    date: string;

    @IsNumber()
    currentKm: number;

    @IsNumber()
    liters: number;

    @IsNumber()
    pricePerLiter: number;

    @IsString()
    @IsOptional()
    gasStation?: string;
}
