// app/hooks/useTopPosts.ts
import { useEffect, useState } from 'react';
import axios from '../lib/axios';

export const useTopPosts = (season: string, year: number) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`/top/${season}/${year}`);
        setData(res.data);
      } catch (err: any) {
        setError(err.message || 'خطا در دریافت داده');
      }
      setLoading(false);
    };

    fetchData();
  }, [season, year]);

  return { data, loading, error };
};
