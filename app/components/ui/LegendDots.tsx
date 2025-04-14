import React from "react";

import { seasonConfig, isSeasonKey, SeasonKey } from '@/features/seasons/utils/seasonConfig';

const LegendDots = ({ season }: { season: string }) => {
  const typedSeason: SeasonKey = isSeasonKey(season) ? season : 'spring';
  const colors = seasonConfig[typedSeason].colors;
  const desc = seasonConfig[typedSeason].description;

  const items = [
    { label: "خبر", className: colors.post },
    { label: "نظر", className: colors.comment },
    { label: "بازدید", className: colors.view },
  ];

  return (
    <div className="flex justify-between w-full items-center flex-wrap gap-4">
      {/* توضیح پس‌زمینه */}
      <div className="text-white text-xs whitespace-nowrap">{desc}</div>

      {/* راهنمای دایره‌ها */}
      <div className="flex gap-4 items-center">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-1">
            <div className={`w-3 h-3 rounded-full ${item.className}`}></div>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegendDots;
