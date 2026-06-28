import {
    Controller,
    Get,
    Post,
    Body,
    Query,
} from '@nestjs/common';
import { RefuelingsService } from './refuelings.service';
import { CreateRefuelingDto } from './dto/refueling.dto';

@Controller('refuelings')
export class RefuelingsController {
    constructor(private readonly refuelingsService: RefuelingsService) { }

    @Post()
    create(@Body() dto: CreateRefuelingDto) {
        return this.refuelingsService.create(dto);
    }

    @Get()
    findAll(@Query('vehicleId') vehicleId: string) {
        return this.refuelingsService.findAll(vehicleId);
    }

    @Get('last-price')
    getLastPrice(@Query('vehicleId') vehicleId: string) {
        return this.refuelingsService.getLastPrice(vehicleId);
    }
}