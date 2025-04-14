import { Post } from "@/types";
import { useEffect, useState, useCallback } from "react";

export function usePaginatedSeasonData(
  fetchFn: (season: string, year: number) => Promise<Post[]>,
  season: string,
  availableYears: number[],
  initialYearCount: number = 2
) {
  const [dataByYear, setDataByYear] = useState<Record<number, Post[]>>({});
  const [currentYearIndex, setCurrentYearIndex] = useState(
    Math.min(initialYearCount, availableYears.length) - 1
  );
  const [loading, setLoading] = useState(false);

  const fetchDataForYear = useCallback(
    async (year: number) => {
      setLoading(true);
      try {
        const data = await fetchFn(season, year);
        setDataByYear((prev: Record<number, Post[]>) => ({ ...prev, [year]: data }));
      } catch {
        setDataByYear((prev: Record<number, Post[]>) => ({ ...prev, [year]: [] }));
      } finally {
        setLoading(false);
      }
    },
    [fetchFn, season]
  );

  useEffect(() => {
    setDataByYear({});
    setCurrentYearIndex(Math.min(initialYearCount, availableYears.length) - 1);
  }, [season, availableYears, initialYearCount]);

  useEffect(() => {
    const year = availableYears[currentYearIndex];
    if (year && !dataByYear[year]) {
      fetchDataForYear(year);
    }
  }, [currentYearIndex, dataByYear, fetchDataForYear, availableYears]);

  const loadMore = () => {
    if (currentYearIndex < availableYears.length - 1) {
      setCurrentYearIndex((prev: number) => prev + 1);
    }
  };

  return {
    dataByYear,
    yearsShown: availableYears.slice(0, currentYearIndex + 1),
    canLoadMore: currentYearIndex < availableYears.length - 1,
    loadMore,
    loading,
  };
}
