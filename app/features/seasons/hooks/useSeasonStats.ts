// app/hooks/useSeasonData.ts
import { useEffect, useState } from 'react';
import axios from '../lib/axios';

export const useSeasonData = (season: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get('/stats');
        const filtered = res.data.filter((item: any) => item.season === season);
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
