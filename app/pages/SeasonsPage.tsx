"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import SeasonCard from "../features/seasons/components/SeasonCard";
import { TopSeasonalPosts } from "../features/seasons/components/TopSeasonalPosts";
import {flattenStats} from "../features/seasons/utils/transformSeasonStats";
import { SeasonStats } from '@/types/season';
import axios from "@/lib/axios";

const seasonOrder = ["spring", "summer", "autumn", "winter"];
const seasonLabels: Record<string, string> = {
  spring: "🌸 بهار",
  summer: "☀️ تابستان",
  autumn: "🍁 پاییز",
  winter: "❄️ زمستان",
};

const PageClient = () => {
  const [stats, setStats] = useState<SeasonStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSeasonIndex, setCurrentSeasonIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/stats");
        setStats(flattenStats(res.data));
      } catch (error) {
        console.error("خطا در دریافت داده:", error);
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
  const viewValues = stats.map((s) => s.views);
  const minViews = Math.min(...viewValues);
  const maxViews = Math.max(...viewValues);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentSeasonIndex((i) => (i + 1) % seasonOrder.length),
    onSwipedRight: () =>
      setCurrentSeasonIndex(
        (i) => (i - 1 + seasonOrder.length) % seasonOrder.length
      ),
    trackTouch: true,
    preventScrollOnSwipe: true,
  });

  let backgroundImage = "/seasons/spring.png";
  if (season === "summer") {
    backgroundImage = "/seasons/summer.png";
  } else if (season === "autumn") {
    backgroundImage = "/seasons/autumn.png";
  } else if (season === "winter") {
    backgroundImage = "/seasons/winter.png";
  }

  if (loading) {
    return <div className="text-center py-10">در حال بارگذاری...</div>;
  }

  return (
    <div className="w-full h-screen overflow-hidden flex flex-col relative">
      {/* لایه‌ی محو و بک‌گراند */}
      <AnimatePresence mode="wait">
        <motion.div
          key={season}
          {...swipeHandlers}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>
        </motion.div>
      </AnimatePresence>

      {/* انتخاب فصل */}
      <div className="flex flex-wrap justify-center gap-2 p-4 bg-white/60 z-10 backdrop-blur-md">
        {seasonOrder.map((s, idx) => (
          <button
            key={s}
            className={`transition px-4 py-2 text-sm rounded-full font-bold shadow-sm
              ${
                idx === currentSeasonIndex
                  ? "bg-blue-700 text-white scale-105 shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            onClick={() => setCurrentSeasonIndex(idx)}
          >
            {seasonLabels[s]}
          </button>
        ))}
      </div>

      {/* محتوای اصلی */}
      <div className="relative z-20 h-full w-full flex flex-col gap-6 p-4 overflow-y-auto md:flex-row md:items-center md:justify-center">
        <div className="space-y-4">
          <SeasonCard
            season={season}
            data={seasonData}
            minPosts={minPosts}
            maxPosts={maxPosts}
            minComments={minComments}
            maxComments={maxComments}
            minViews={minViews}
            maxViews={maxViews}
          />
        </div>
        <div>
          <TopSeasonalPosts season={season} initialYearCount={1} />
        </div>
      </div>
    </div>
  );
};

export default PageClient;
