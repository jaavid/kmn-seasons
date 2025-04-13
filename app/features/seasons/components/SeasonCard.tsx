// components/SeasonCard.tsx
import React from "react";
import YearRow from "@/components/charts/YearRow";
import { SeasonStats } from "@/features/seasons/utils/transformSeasonStats";

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
  maxViews
}) => {
  const years = Array.from(new Set(data.map((stat) => stat.year))).sort(
    (a, b) => Number(b) - Number(a)
  );

  const yearPairs = [];
  for (let i = 0; i < years.length; i += 2) {
    yearPairs.push([years[i], years[i + 1]]);
  }

  // تعریف mapping فصل به ماه‌های مربوطه (مثلاً فصل‌های شمسی)
  const seasonMonthMapping: { [key: string]: number[] } = {
    spring: [1, 2, 3],
    summer: [4, 5, 6],
    autumn: [7, 8, 9],
    winter: [10, 11, 12],
  };
  const months = seasonMonthMapping[season] || [];

  // mapping شماره ماه به نام شمسی
  const jalaliMonthNames: { [key: number]: string } = {
    1: "فروردین",
    2: "اردیبهشت",
    3: "خرداد",
    4: "تیر",
    5: "مرداد",
    6: "شهریور",
    7: "مهر",
    8: "آبان",
    9: "آذر",
    10: "دی",
    11: "بهمن",
    12: "اسفند",
  };


  // مسیر تصاویر بک‌گراند برای هر فصل
  let backgroundImage = "/seasons/spring.png";
  if (season === "summer") {
    backgroundImage = "/seasons/summer.png";
  } else if (season === "autumn") {
    backgroundImage = "/seasons/autumn.png";
  } else if (season === "winter") {
    backgroundImage = "/seasons/winter.png";
  }

  return (
    <div
      className="relative p-6 rounded-xl shadow-lg text-white bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="relative z-10">
        <div className="space-y-4">
          {yearPairs.map((pair, index) => (
            <div key={index} className="grid grid-cols-2 gap-4">
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
    </div>
  );
};
export default SeasonCard;
