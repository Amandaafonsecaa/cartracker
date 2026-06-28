import { Controller, Get, Param, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    @Get(':vehicleId')
    getSummary(
        @Param('vehicleId') vehicleId: string,
        @Query('month') month: string,
    ) {
        return this.dashboardService.getSummary(vehicleId, month);
    }
}