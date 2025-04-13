import { SeasonStats, SeasonName } from "@/types";

type RawStats = Record<
  SeasonName,
  Record<
    string,
    Record<
      string,
      {
        posts: number;
        comments: number;
        views: number;
      }
    >
  >
>;

export const flattenStats = (data: RawStats): SeasonStats[] => {
  const stats: SeasonStats[] = [];

  (Object.keys(data) as SeasonName[]).forEach((season) => {
    const seasonData = data[season];
    for (const year in seasonData) {
      const yearData = seasonData[year];
      for (const month in yearData) {
        const stat = yearData[month];
        stats.push({
          season,
          year,
          month: parseInt(month, 10),
          posts: stat.posts,
          comments: stat.comments,
          views: stat.views,
        });
      }
    }
  });

  return stats;
};
