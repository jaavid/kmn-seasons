// app/hooks/useSeasonData.ts
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { SeasonStats } from '@/types';

export const useSeasonStats = () => {
  const [data, setData] = useState<SeasonStats[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get('/seasonStats');
        const filtered = res.data.filter((item: unknown): item is SeasonStats => {
          return (
            typeof item === 'object' &&
            item !== null &&
            'season' in item &&
            (item as SeasonStats).season !== undefined
          );
        });
        setData(filtered);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || 'خطا در دریافت داده');
        } else {
          setError('خطای ناشناخته');
        }
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
