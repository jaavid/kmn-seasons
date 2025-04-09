// components/YearRow.tsx
import React from 'react';
import BubbleCircle from './BubbleCircle';
import { SeasonStats } from '../utils/flattenStats';

type YearRowProps = {
  year: string;
  data: SeasonStats[];
  minPosts: number;
  maxPosts: number;
  minComments: number;
  maxComments: number;
};

const YearRow: React.FC<YearRowProps> = ({
  year,
  data,
  minPosts,
  maxPosts,
  minComments,
  maxComments,
}) => {
  // مرتب‌سازی داده‌ها بر اساس شماره ماه
  const sortedData = data.sort((a, b) => a.month - b.month);
  
  return (
    <div className="my-4 min-h-10">    
    <div className="grid grid-cols-4 gap-4">
    <h3 className="text-xl font-semibold w-full">{year}</h3>
      {sortedData.map((stat) => (
        <div key={stat.month} className="w-full">
          <BubbleCircle
            stat={stat}
            minPosts={minPosts}
            maxPosts={maxPosts}
            minComments={minComments}
            maxComments={maxComments}
          />
        </div>
      ))}
    </div>
  </div>
  );
};

export default YearRow;
