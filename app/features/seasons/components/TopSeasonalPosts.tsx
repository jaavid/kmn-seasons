import React from "react";
import { useTopComments } from "../hooks/useTopComments";
import { useTopSeasonalPosts } from "../hooks/useTopSeasonalPosts";
import PostCard from "@/components/ui/PostCard";

export function TopSeasonalPosts({
  season,
  availableYears,
  initialYearCount = 2,
}: {
  season: string;
  availableYears: number[];
  initialYearCount?: number;
}) {
  const {
    dataByYear: topPostsByYear,
    yearsShown,
    canLoadMore,
    loadMore,
    loading,
  } = useTopSeasonalPosts(season, availableYears, initialYearCount);

  const { dataByYear: topCommentsByYear } = useTopComments(
    season,
    availableYears,
    initialYearCount
  );

  return (
    <div className="space-y-10">
      {yearsShown.map((year) => {
        const jalaliYear = (year - 621).toLocaleString("fa-IR", {
          useGrouping: false,
        });
        return (
          <React.Fragment key={year}>
            <h2 className="text-3xl text-center font-bold mb-4">سال {jalaliYear}</h2>
            {loading ? "" : <h4 className="text-xl font-bold mb-4"> برای شما نوشتیم</h4>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {(topPostsByYear[year] || []).map((post) => (
                <PostCard key={post.post_id} post={post} type="view" />
              ))}
            </div>
            {loading ? "" : <h4 className="text-xl font-bold mb-4"> برای ما نوشتید</h4>}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {(topCommentsByYear[year] || []).slice(0, 4).map((post) => (
                <PostCard key={post.post_id} post={post} type="comment" />
              ))}
            </div>
          </React.Fragment>
        );
      })}

      {canLoadMore && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            {loading ? "در حال بارگذاری..." : "سال قبل"}
          </button>
        </div>
      )}
    </div>
  );
}
