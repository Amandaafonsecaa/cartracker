import { IsString } from 'class-validator';

export class CreateInsightDto {
    @IsString()
    vehicleId: string;

    @IsString()
    month: string;
}