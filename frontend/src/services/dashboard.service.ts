import api from './api';
import type { DashboardData } from '../types/dashboard';

interface GetDashboardParams {
    vehicleId: string;
    month: string;
}

export async function getDashboard({
    vehicleId,
    month,
}: GetDashboardParams): Promise<DashboardData> {
    const response = await api.get<DashboardData>(
        `/dashboard/${vehicleId}`,
        {
            params: {
                month,
            },
        },
    );

    return response.data;
}