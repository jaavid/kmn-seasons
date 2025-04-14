import axios from "@/lib/axios";
import { usePaginatedSeasonData } from "./usePaginatedSeasonData";

const fetchComments = async (season: string, year: number) => {
  const res = await axios.get(`/top-comments/${season}/${year}`);
  return res.data;
};

export const useTopComments = (season: string, years: number[], count = 2) =>
  usePaginatedSeasonData(fetchComments, season, years, count);
