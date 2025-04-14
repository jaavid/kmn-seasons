import axios from "@/lib/axios";
import { usePaginatedSeasonData } from "./usePaginatedSeasonData";

const fetchTops = async (season: string, year: number) => {
  const res = await axios.get(`/top/${season}/${year}`);
  return res.data;
};

export const useTopSeasonalPosts = (season: string, years: number[], count = 2) =>
  usePaginatedSeasonData(fetchTops, season, years, count);
