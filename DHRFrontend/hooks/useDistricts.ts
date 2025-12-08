import { useState, useEffect, useCallback } from 'react';
import { districtService } from '../services/api/districtService';
import { DistrictData } from '../services/mock/mockDistrictData';

interface UseDistrictsResult {
    districts: DistrictData[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export const useDistricts = (): UseDistrictsResult => {
    const [districts, setDistricts] = useState<DistrictData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDistricts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await districtService.getAllDistricts();
            if (response.success) {
                setDistricts(response.data);
            } else {
                setError(response.error || 'Failed to fetch districts');
            }
        } catch (err: any) {
            setError(err.error || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDistricts();
    }, [fetchDistricts]);

    return { districts, loading, error, refetch: fetchDistricts };
};
