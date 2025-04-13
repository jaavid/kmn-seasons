// components/YearRow.tsx
import React from 'react';
import BubbleCircle from '@/components/ui/BubbleCircle';
import { SeasonStats } from '@/types/season';

type YearRowProps = {
  year: string;
  data: SeasonStats[];
  minPosts: number;
  maxPosts: number;
  minComments: number;
  maxComments: number;
  minViews: number;
  maxViews: number;
};

const YearRow: React.FC<YearRowProps> = ({
  year,
  data,
  minPosts,
  maxPosts,
  minComments,
  maxComments,
  minViews,
  maxViews
}) => {
  // مرتب‌سازی داده‌ها بر اساس شماره ماه
  const sortedData = data.sort((a, b) => a.month - b.month);
  
  return (
    <div className="my-4">
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
    <h3 className="text-base md:text-lg font-semibold w-full text-shadow-xs">{Number(year) - 621}</h3>
      {sortedData.map((stat) => (
        <div key={stat.month} className="w-full">
          <BubbleCircle
            stat={stat}
            minPosts={minPosts}
            maxPosts={maxPosts}
            minComments={minComments}
            maxComments={maxComments}
            minViews={minViews}
            maxViews={maxViews}
          />
        </div>
      ))}
    </div>
  </div>
  );
};

export default YearRow;
