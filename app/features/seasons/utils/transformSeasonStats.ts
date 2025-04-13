// utils/flattenStats.ts
export type SeasonStats = {
    season: "spring" | "summer" | "autumn" | "winter";
    year: string;
    month: number;
    posts: number;
    comments: number;
    views: number; // ✅ اضافه کن
  };
  
  export const flattenStats = (data: any): SeasonStats[] => {
    const stats: SeasonStats[] = [];
    for (const season in data) {
      const seasonData = data[season];
      for (const year in seasonData) {
        const yearData = seasonData[year];
        for (const month in yearData) {
          const stat = yearData[month];
          stats.push({
            season: season as "spring" | "summer" | "autumn" | "winter",
            year,
            month: parseInt(month, 10),
            posts: stat.posts,
            comments: stat.comments,
            views: stat.views,
          });
        }
      }
    }
    return stats;
  };
  