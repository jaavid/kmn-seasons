// ✅ فایل: app/features/seasons/utils/seasonConfig.ts

export const seasonConfig = {
  spring: {
    label: "🌸 بهار",
    background: "/seasons/spring.png",
    description: "گنبد جبلیه – بهار کرمان",
    colors: {
      post: "bg-green-300",
      comment: "bg-green-500",
      view: "bg-green-700",
    },
  },
  summer: {
    label: "☀️ تابستان",
    background: "/seasons/summer.png",
    description: "کویر لوت – تابستان کرمان",
    colors: {
      post: "bg-yellow-300",
      comment: "bg-yellow-500",
      view: "bg-yellow-700",
    },
  },
  autumn: {
    label: "🍁 پاییز",
    background: "/seasons/autumn.png",
    description: "پاییز هزار رنگ – پاییز کرمان",
    colors: {
      post: "bg-orange-300",
      comment: "bg-orange-500",
      view: "bg-orange-700",
    },
  },
  winter: {
    label: "❄️ زمستان",
    background: "/seasons/winter.png",
    description: "کوه هزار – زمستان کرمان",
    colors: {
      post: "bg-blue-300",
      comment: "bg-blue-500",
      view: "bg-blue-700",
    },
  },
} as const;

export type SeasonKey = keyof typeof seasonConfig;

export function isSeasonKey(key: string): key is SeasonKey {
  return key in seasonConfig;
}