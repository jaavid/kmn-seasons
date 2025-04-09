// app/page.tsx
import React from 'react';
import SeasonCard from './components/SeasonCard';
import { flattenStats, SeasonStats } from './utils/flattenStats';

export default async function HomePage() {
  // دریافت داده با تنظیم revalidate برای ISR (Incremental Static Regeneration)
  const res = await fetch('https://kermaneno.ir/wp-json/seasons/v1/stats', {
    next: { revalidate: 60 }, // هر 60 ثانیه
  });
  const data = await res.json();
  const flatStats = flattenStats(data);

  // گروه‌بندی داده‌ها بر اساس فصل
  const seasons: { [key: string]: SeasonStats[] } = {};
  flatStats.forEach((stat) => {
    if (!seasons[stat.season]) {
      seasons[stat.season] = [];
    }
    seasons[stat.season].push(stat);
  });

  // محاسبه مقادیر کمینه و بیشینه برای استفاده در normalize()
  const postValues = flatStats.map((stat) => stat.posts);
  const commentValues = flatStats.map((stat) => stat.comments);
  const minPosts = Math.min(...postValues);
  const maxPosts = Math.max(...postValues);
  const minComments = Math.min(...commentValues);
  const maxComments = Math.max(...commentValues);

  // ترتیب نمایش فصل‌ها
  const seasonOrder = ['spring', 'summer', 'autumn', 'winter'];

  return (
    // <div
    //   className="season-grid"
    //   style={{
    //     display: 'grid',
    //     gridTemplateColumns: 'repeat(2, 1fr)',
    //     gap: '20px',
    //   }}
    // >
    //   {seasonOrder.map((season) => {
    //     if (!seasons[season]) return null;
    //     return (
    //       <SeasonCard
    //         key={season}
    //         season={season}
    //         data={seasons[season]}
    //         minPosts={minPosts}
    //         maxPosts={maxPosts}
    //         minComments={minComments}
    //         maxComments={maxComments}
    //       />
    //     );
    //   })}
    // </div>
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {seasonOrder.map((season) => {
          if (!seasons[season]) return null;
          return (
            <SeasonCard
              key={season}
              season={season}
              data={seasons[season]}
              minPosts={minPosts}
              maxPosts={maxPosts}
              minComments={minComments}
              maxComments={maxComments}
            />
          );
        })}
      </div>
    </div>
  );
}
