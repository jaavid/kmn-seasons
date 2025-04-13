import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { Post } from '@/types';

export const useTopPosts = (season: string, year: number) => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`/top/${season}/${year}`);
        setData(res.data);
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
  }, [season, year]);

  return { data, loading, error };
};
