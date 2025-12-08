import { axiosInstance, ApiResponse, simulateDelay, USE_MOCK_API } from './apiClient';
import { DistrictData, mockDistricts } from '../mock/mockDistrictData';

export const districtService = {
    getAllDistricts: async (): Promise<ApiResponse<DistrictData[]>> => {
        if (USE_MOCK_API) {
            await simulateDelay();
            return {
                success: true,
                data: mockDistricts,
                metadata: {
                    total: mockDistricts.length,
                    page: 1,
                    limit: 100,
                    timestamp: new Date().toISOString(),
                },
            };
        }

        try {
            const response = await axiosInstance.get<ApiResponse<DistrictData[]>>('/districts');
            return response.data;
        } catch (error: any) {
            console.error('Error fetching districts:', error);
            throw error.response?.data || { success: false, error: 'Failed to fetch districts' };
        }
    },

    getDistrictDetails: async (id: string): Promise<ApiResponse<DistrictData | null>> => {
        if (USE_MOCK_API) {
            await simulateDelay();
            const district = mockDistricts.find((d) => d.id === id);
            if (!district) {
                return {
                    success: false,
                    data: null,
                    error: 'District not found',
                };
            }
            return {
                success: true,
                data: district,
                metadata: {
                    total: 1,
                    page: 1,
                    limit: 1,
                    timestamp: new Date().toISOString(),
                },
            };
        }

        try {
            const response = await axiosInstance.get<ApiResponse<DistrictData>>(`/districts/${id}`);
            return response.data;
        } catch (error: any) {
            console.error(`Error fetching district ${id}:`, error);
            throw error.response?.data || { success: false, error: 'Failed to fetch district details' };
        }
    },
};
