// components/BubbleCircle.tsx
import React from 'react';
import { normalize } from '@/features/seasons/utils/normalizeBubbleSize';
import { SeasonStats } from '@/features/seasons/utils/transformSeasonStats';

type BubbleCircleProps = {
  stat: SeasonStats;
  minPosts: number;
  maxPosts: number;
  minComments: number;
  maxComments: number;
};

const seasonColors: Record<string, { post: string; comment: string }> = {
  spring: { post: 'bg-green-300', comment: 'bg-green-500' },
  summer: { post: 'bg-yellow-300', comment: 'bg-yellow-500' },
  autumn: { post: 'bg-orange-300', comment: 'bg-orange-500' },
  winter: { post: 'bg-blue-300', comment: 'bg-blue-500' },
};

const BubbleCircle: React.FC<BubbleCircleProps> = ({
  stat,
  minPosts,
  maxPosts,
  minComments,
  maxComments,
}) => {
  const postSize = normalize(stat.posts, minPosts, maxPosts);
  const commentSize = normalize(stat.comments, minComments, maxComments);
  const season = stat.season;
  const colors = seasonColors[season] || { post: 'bg-gray-300', comment: 'bg-gray-500' };

  return (
    <div className="flex justify-center gap-2">
      {/* دایره پست‌ها */}
      <div
        className={`relative group flex items-center justify-center rounded-full text-sm font-light text-white ${colors.post}`}
        style={{ width: postSize, height: postSize }}
      >
        {stat.posts}
        <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
          خبر: {stat.posts} <br /> نظر: {stat.comments}
        </div>
      </div>

      {/* دایره دیدگاه‌ها */}
      <div
        className={`flex items-center justify-center rounded-full text-sm font-light text-white ${colors.comment}`}
        style={{ width: commentSize, height: commentSize }}
      >
        {stat.comments}
      </div>
    </div>
  );
};

export default BubbleCircle;
