// app/pages/PageClient.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import SeasonCard from '../features/seasons/components/SeasonCard';
import { TopSeasonalPosts } from '../features/seasons/components/TopSeasonalPosts';
import { flattenStats, SeasonStats } from '../features/seasons/utils/transformSeasonStats';
import axios from '@/lib/axios';

const seasonOrder = ['spring', 'summer', 'autumn', 'winter'];
const seasonLabels: Record<string, string> = {
  spring: '🌸 بهار',
  summer: '☀️ تابستان',
  autumn: '🍁 پاییز',
  winter: '❄️ زمستان',
};

const PageClient = () => {
  const [stats, setStats] = useState<SeasonStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSeasonIndex, setCurrentSeasonIndex] = useState(0);
  const [visibleYearsBySeason, setVisibleYearsBySeason] = useState<Record<string, number>>(
    Object.fromEntries(seasonOrder.map((season) => [season, 2]))
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/stats');
        setStats(flattenStats(res.data));
      } catch (error) {
        console.error('خطا در دریافت داده:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const season = seasonOrder[currentSeasonIndex];
  const seasonData = stats.filter((s) => s.season === season);

  const postValues = stats.map((s) => s.posts);
  const commentValues = stats.map((s) => s.comments);
  const minPosts = Math.min(...postValues);
  const maxPosts = Math.max(...postValues);
  const minComments = Math.min(...commentValues);
  const maxComments = Math.max(...commentValues);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setCurrentSeasonIndex((i) => (i + 1) % seasonOrder.length),
    onSwipedRight: () =>
      setCurrentSeasonIndex((i) => (i - 1 + seasonOrder.length) % seasonOrder.length),
    trackTouch: true,
    // preventDefaultTouchmoveEvent: true,
    preventScrollOnSwipe: true, // ✅ اینو استفاده کن
  });

  const visibleYearCount = visibleYearsBySeason[season];
  const allYears = Array.from(new Set(seasonData.map((s) => s.year))).sort((a, b) => Number(b) - Number(a));
  const visibleYears = allYears.slice(0, visibleYearCount);

  const loadMoreYears = () => {
    setVisibleYearsBySeason((prev) => ({
      ...prev,
      [season]: (prev[season] || 2) + 1,
    }));
  };

  if (loading) {
    return <div className="text-center py-10">در حال بارگذاری...</div>;
  }

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col">
      {/* انتخاب فصل */}
      <div className="flex justify-center gap-2 p-4 bg-white/60 z-10 backdrop-blur-md">
        {seasonOrder.map((s, idx) => (
          <button
            key={s}
            className={`transition px-4 py-2 text-sm rounded-full font-bold shadow-sm
              ${idx === currentSeasonIndex
                ? 'bg-blue-700 text-white scale-105 shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setCurrentSeasonIndex(idx)}
          >
            {seasonLabels[s]}
          </button>
        ))}
      </div>

      {/* نمایش فصل */}
      <AnimatePresence mode="wait">
        <motion.div
          {...swipeHandlers}
          key={season}
          className="h-full w-full overflow-hidden"
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="h-full overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/10 backdrop-blur-sm p-4">
            <div className="space-y-4">
              <SeasonCard
                season={season}
                data={seasonData}
                minPosts={minPosts}
                maxPosts={maxPosts}
                minComments={minComments}
                maxComments={maxComments}
              />
            </div>
            <TopSeasonalPosts season={season} initialYearCount={2} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PageClient;
