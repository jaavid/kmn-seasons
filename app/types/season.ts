export type SeasonName = "spring" | "summer" | "autumn" | "winter";

export type SeasonStats = {
  season: SeasonName;
  year: string;
  month: number;
  posts: number;
  comments: number;
  views: number;
};
