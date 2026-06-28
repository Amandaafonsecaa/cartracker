import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateExpenseDto {
    @IsString()
    vehicleId: string;

    @IsDateString()
    date: string;

    @IsNumber()
    amount: number;

    @IsString()
    category: string;

    @IsString()
    @IsOptional()
    description?: string;
}
