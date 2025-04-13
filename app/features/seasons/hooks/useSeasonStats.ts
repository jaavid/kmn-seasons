// app/hooks/useSeasonData.ts
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { SeasonStats } from '@/types';

export const useSeasonData = (season: string) => {
  const [data, setData] = useState<SeasonStats[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get('/stats');
        const filtered = res.data.filter((item: unknown): item is SeasonStats => {
          return (
            typeof item === 'object' &&
            item !== null &&
            'season' in item &&
            (item as any).season === season
          );
        });
        setData(filtered);
      } catch (err: any) {
        setError(err.message || 'خطا در دریافت داده');
      }
      setLoading(false);
    };

    fetchData();
  }, [season]);

  return { data, loading, error };
};
