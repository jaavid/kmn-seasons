// components/BubbleCircle.tsx
import React from 'react';
import { normalize } from '../utils/normalize';
import { SeasonStats } from '../utils/flattenStats';

type BubbleCircleProps = {
  stat: SeasonStats;
  minPosts: number;
  maxPosts: number;
  minComments: number;
  maxComments: number;
};

const BubbleCircle: React.FC<BubbleCircleProps> = ({
  stat,
  minPosts,
  maxPosts,
  minComments,
  maxComments,
}) => {
  // محاسبه اندازه‌ی دایره‌ها بر اساس نرمالایز کردن مقدارها
  const postSize = normalize(stat.posts, minPosts, maxPosts);
  const commentSize = normalize(stat.comments, minComments, maxComments);

  return (
    <div className="flex justify-center gap-2">
      <div
        className="flex items-center justify-center rounded-full bg-green-300 text-sm font-light text-white shadow"
        style={{ width: postSize, height: postSize }}
      >
        {stat.posts}
      </div>
      <div
        className="flex items-center justify-center rounded-full bg-blue-300 text-sm font-light text-white shadow"
        style={{ width: commentSize, height: commentSize }}
      >
        {stat.comments}
      </div>
    </div>
  );
};

export default BubbleCircle;
