// components/SeasonCard.tsx
import React from 'react';
import YearRow from './YearRow';
import { SeasonStats } from '../utils/flattenStats';

type SeasonCardProps = {
  season: string;
  data: SeasonStats[];
  minPosts: number;
  maxPosts: number;
  minComments: number;
  maxComments: number;
};

const SeasonCard: React.FC<SeasonCardProps> = ({
  season,
  data,
  minPosts,
  maxPosts,
  minComments,
  maxComments,
}) => {
  // گروه‌بندی داده‌ها بر اساس سال
  const years = Array.from(new Set(data.map((stat) => stat.year)));

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
    1: 'فروردین',
    2: 'اردیبهشت',
    3: 'خرداد',
    4: 'تیر',
    5: 'مرداد',
    6: 'شهریور',
    7: 'مهر',
    8: 'آبان',
    9: 'آذر',
    10: 'دی',
    11: 'بهمن',
    12: 'اسفند',
  };

  // رنگ پس‌زمینه و آیکون مربوط به فصل
  let seasonBg = 'bg-green-50';
  let iconPath = '/icons/spring.png';
  if (season === 'summer') {
    seasonBg = 'bg-yellow-50';
    iconPath = '/icons/summer.png';
  } else if (season === 'autumn') {
    seasonBg = 'bg-orange-50';
    iconPath = '/icons/autumn.png';
  } else if (season === 'winter') {
    seasonBg = 'bg-blue-50';
    iconPath = '/icons/winter.png';
  }

  return (
    <div className={`relative p-6 rounded-xl shadow-lg ${seasonBg}`}>
      {/* آیکون فصل در گوشه بالا */}
      <div className="absolute top-4 right-4 opacity-40">
        <img src={iconPath} alt={season} className="w-16 h-16" />
      </div>
      {/* <h2 className="text-3xl font-bold text-center capitalize mb-4">{season}</h2> */}

      {/* هدر ماه‌ها (یکبار نمایش داده می‌شود) */}
      <div className="grid grid-cols-4 gap-4 mb-4 border-b pb-2">
      <div className="h-full" aria-hidden="true"></div>
        {months.map((month) => (
          <div key={month} className="text-center font-medium text-gray-700">
            {jalaliMonthNames[month]}
          </div>
        ))}
      </div>

      {/* ردیف‌های سال */}
      {years.map((year) => {
        // فیلتر داده‌های مربوط به آن سال
        const yearData = data.filter((stat) => stat.year === year);
        return (
          <YearRow
            key={year}
            year={year}
            data={yearData}
            // months={months}
            minPosts={minPosts}
            maxPosts={maxPosts}
            minComments={minComments}
            maxComments={maxComments}
          />
        );
      })}
    </div>
  );
};

export default SeasonCard;
