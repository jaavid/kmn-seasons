"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";

type Post = {
  post_id: string;
  post_title: string;
  total_views: string;
  comment_count: string;
  thumbnail_url: string;
};

type DataByYear = {
  [year: number]: Post[];
};

export function useTopSeasonalPosts(
  season: string,
  availableYears: number[],
  initialYearCount: number = 2
) {
  const [dataByYear, setDataByYear] = useState<DataByYear>({});
  const [currentYearIndex, setCurrentYearIndex] = useState<number>(
    Math.min(initialYearCount, availableYears.length) - 1
  );
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDataForYear = useCallback(
    async (year: number) => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://kermaneno.ir/wp-json/seasons/v1/top/${season}/${year}`
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const json: Post[] = await res.json();
        setDataByYear((prev) => ({ ...prev, [year]: json }));
      } catch (err: unknown) {
        const error = err as Error;
        console.error("Error fetching data:", error.message);
        setDataByYear((prev) => ({ ...prev, [year]: [] }));
      }
      setLoading(false);
    },
    [season]
  );

  // Reset on season change
  useEffect(() => {
    setDataByYear({});
    setCurrentYearIndex(Math.min(initialYearCount, availableYears.length) - 1);
  }, [season, availableYears, initialYearCount]);

  useEffect(() => {
    if (currentYearIndex < availableYears.length) {
      const year = availableYears[currentYearIndex];
      if (!dataByYear[year]) {
        fetchDataForYear(year);
      }
    }
  }, [currentYearIndex, dataByYear, fetchDataForYear, availableYears]);

  const loadMore = () => {
    if (currentYearIndex < availableYears.length - 1) {
      setCurrentYearIndex((prev) => prev + 1);
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

export function TopSeasonalPosts({
  season,
  availableYears,
  initialYearCount = 2,
}: {
  season: string;
  availableYears: number[];
  initialYearCount?: number;
}) {
  const { dataByYear, yearsShown, canLoadMore, loadMore, loading } =
    useTopSeasonalPosts(season, availableYears, initialYearCount);

  return (
    <div className="space-y-10">
      {yearsShown.map((year) => {
        const jalaliYear = (year - 621).toLocaleString("fa-IR", {
          useGrouping: false,
        });
        return (
          <div key={year}>
            <h2 className="text-xl font-bold mb-4">سال {jalaliYear}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {(dataByYear[year] || []).map((post) => {
                const viewsFormatted = Number(post.total_views).toLocaleString(
                  "fa-IR"
                );
                const commentCount = Number(post.comment_count);
                const commentsFormatted = commentCount.toLocaleString("fa-IR");

                return (
                  <div
                    key={post.post_id}
                    className="relative rounded-2xl overflow-hidden shadow-sm group"
                  >
                    <Image
                      src={post.thumbnail_url}
                      alt={post.post_title}
                      width={400}
                      height={160}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-3 text-right">
                      <p className="text-sm font-semibold leading-tight">
                        {post.post_title}
                      </p>
                    </div>
                    <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                      👁️ {viewsFormatted}
                    </div>
                    {commentCount > 0 && (
                      <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                        💬 {commentsFormatted}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {canLoadMore && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            {loading ? "در حال بارگذاری..." : " سال قبل"}
          </button>
        </div>
      )}
    </div>
  );
}
