import React from 'react';

const seasonColors: Record<string, { post: string; comment: string; view: string }> = {
  spring: { post: 'bg-green-300', comment: 'bg-green-500', view: 'bg-green-700' },
  summer: { post: 'bg-yellow-300', comment: 'bg-yellow-500', view: 'bg-yellow-700' },
  autumn: { post: 'bg-orange-300', comment: 'bg-orange-500', view: 'bg-orange-700' },
  winter: { post: 'bg-blue-300', comment: 'bg-blue-500', view: 'bg-blue-700' },
};

const LegendDots = ({ season }: { season: string }) => {
  const colors = seasonColors[season] || seasonColors.spring;

  const items = [
    { label: 'خبر', className: colors.post },
    { label: 'نظر', className: colors.comment },
    { label: 'بازدید', className: colors.view },
  ];

  return (
    <div className="flex gap-4 items-center">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          <div className={`w-3 h-3 rounded-full ${item.className}`}></div>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default LegendDots;
