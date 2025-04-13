import React from 'react';
import { normalize } from '@/features/seasons/utils/normalizeBubbleSize';
import { SeasonStats } from '@/types/season';

type BubbleCircleProps = {
  stat: SeasonStats;
  minPosts: number;
  maxPosts: number;
  minComments: number;
  maxComments: number;
  minViews: number;
  maxViews: number;
};

const seasonColors: Record<string, { post: string; comment: string; view: string }> = {
  spring: { post: 'bg-green-300', comment: 'bg-green-500', view: 'bg-green-700' },
  summer: { post: 'bg-yellow-300', comment: 'bg-yellow-500', view: 'bg-yellow-700' },
  autumn: { post: 'bg-orange-300', comment: 'bg-orange-500', view: 'bg-orange-700' },
  winter: { post: 'bg-blue-300', comment: 'bg-blue-500', view: 'bg-blue-700' },
};

const BubbleCircle: React.FC<BubbleCircleProps> = ({
  stat,
  minPosts,
  maxPosts,
  minComments,
  maxComments,
  minViews,
  maxViews,
}) => {
  const postSize = normalize(stat.posts, minPosts, maxPosts);
  const commentSize = normalize(stat.comments, minComments, maxComments);
  const viewSize = normalize(stat.views, minViews, maxViews);

  const colors = seasonColors[stat.season] || {
    post: 'bg-gray-300',
    comment: 'bg-gray-500',
    view: 'bg-gray-700',
  };

  return (
    <div className="flex justify-center gap-2">
      {/* دایره پست‌ها */}
      {stat.posts > 0 && (
        <div
          className={`relative group rounded-full opacity-70 shadow-md ${colors.post}`}
          style={{ width: postSize, height: postSize }}
        >
          <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
            {stat.posts.toLocaleString("fa-IR")} خبر
          </div>
        </div>
      )}

      {/* دایره دیدگاه‌ها */}
      {stat.comments > 0 && (
        <div
          className={`relative group rounded-full opacity-70 shadow-md ${colors.comment}`}
          style={{ width: commentSize, height: commentSize }}
        >
          <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
            {stat.comments.toLocaleString("fa-IR")} نظر
          </div>
        </div>
      )}

      {/* دایره بازدیدها */}
      {stat.views > 0 && (
        <div
          className={`relative group rounded-full opacity-70 shadow-md ${colors.view}`}
          style={{ width: viewSize, height: viewSize }}
        >
          <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
            {stat.views.toLocaleString("fa-IR")} مشاهده
          </div>
        </div>
      )}
    </div>
  );
};

export default BubbleCircle;
