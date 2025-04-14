// components/SeasonCard.tsx
import React from "react";
import YearRow from "@/components/charts/YearRow";
import { SeasonStats } from "@/types/season";
import { getSeasonBackground } from "../utils/getSeasonBackground";
import LegendDots from "@/components/ui/LegendDots";

type SeasonCardProps = {
  season: string;
  data: SeasonStats[];
  minPosts: number;
  maxPosts: number;
  minComments: number;
  maxComments: number;
  minViews: number;
  maxViews: number;
};

const SeasonCard: React.FC<SeasonCardProps> = ({
  season,
  data,
  minPosts,
  maxPosts,
  minComments,
  maxComments,
  minViews,
  maxViews,
}) => {
  const years = Array.from(new Set(data.map((stat) => stat.year))).sort(
    (a, b) => Number(b) - Number(a)
  );

  const yearPairs = [];
  for (let i = 0; i < years.length; i += 2) {
    yearPairs.push([years[i], years[i + 1]]);
  }

  return (
    <div
      className="relative p-4 rounded-xl shadow-lg text-white bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${getSeasonBackground(season)})` }}
    >
      <div className="relative z-10">
        <div className="space-y-2">
          {yearPairs.map((pair, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {pair.map((year) => {
                if (!year) return null;
                const yearData = data.filter((stat) => stat.year === year);
                return (
                  <YearRow
                    key={year}
                    year={year}
                    data={yearData}
                    minPosts={minPosts}
                    maxPosts={maxPosts}
                    minComments={minComments}
                    maxComments={maxComments}
                    maxViews={maxViews}
                    minViews={minViews}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-xs px-4 py-2 mt-2 backdrop-blur-sm flex justify-center gap-6 rounded-b-xl">
        <LegendDots season={season} />
      </div>
    </div>
  );
};
export default SeasonCard;
