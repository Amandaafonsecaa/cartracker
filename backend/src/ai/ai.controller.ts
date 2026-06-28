import { Controller, Get, Param, Query } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('insights')
export class AiController {
    constructor(private readonly aiService: AiService) { }

    @Get(':vehicleId')
    getInsight(
        @Param('vehicleId') vehicleId: string,
        @Query('month') month: string,
    ) {
        return this.aiService.getInsight(vehicleId, month);
    }
}