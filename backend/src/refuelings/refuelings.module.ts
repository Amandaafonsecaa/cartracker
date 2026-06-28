import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Refueling } from './entities/refueling.entity';
import { RefuelingsController } from './refuelings.controller';
import { RefuelingsService } from './refuelings.service';

@Module({
    imports: [TypeOrmModule.forFeature([Refueling])],
    controllers: [RefuelingsController],
    providers: [RefuelingsService],
})
export class RefuelingsModule { }