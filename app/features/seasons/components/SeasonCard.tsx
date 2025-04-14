// components/SeasonCard.tsx
import React from "react";
import YearRow from "@/components/charts/YearRow";
import { SeasonStats } from "@/types/season";
import { getSeasonBackground } from "../utils/getSeasonBackground";

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
      <p className="text-xs text-gray-600 mt-1">
        <div
          className={`relative group text-center rounded-full opacity-70 shadow-md col bg-green-300`}
          style={{ width: 20, height: 20 }}
        >
          📰
        </div>

        <div
          className={`relative group text-center rounded-full opacity-70 shadow-md col bg-green-500`}
          style={{ width: 20, height: 20 }}
        >
          💬
        </div>

        <div
          className={`relative group text-center rounded-full opacity-70 shadow-md col bg-green-700`}
          style={{ width: 20, height: 20 }}
        >
          👁️
        </div>
        هر دایره نشان‌دهنده 📰 تعداد خبر، 💬 نظر یا 👁️ بازدید در ماه مورد نظر
        است. اندازه‌ی دایره متناسب با مقدار است.
      </p>
    </div>
  );
};
export default SeasonCard;
