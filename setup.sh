#!/bin/bash

echo "📁 در حال ساخت ساختار جدید پروژه..."

# پوشه‌های اصلی
mkdir -p app/pages
mkdir -p app/features/seasons/{hooks,components,utils,api}
mkdir -p app/components/ui
mkdir -p app/components/charts
mkdir -p app/lib
mkdir -p app/styles

# انتقال فایل‌ها (اختیاری: می‌تونی دستی انجام بدی)
echo "🔄 انتقال فایل‌های موجود (اگر مایل بودی)..."

# فایل‌هایی که باید منتقل بشن (اگر هستن)
FILES_TO_MOVE=(
  "app/hooks/useSeasonData.ts:app/features/seasons/hooks/useSeasonStats.ts"
  "app/hooks/useTopPosts.ts:app/features/seasons/hooks/useTopPosts.ts"
  "app/utils/flattenStats.ts:app/features/seasons/utils/transformSeasonStats.ts"
  "app/utils/normalize.ts:app/features/seasons/utils/normalizeBubbleSize.ts"
  "app/components/SeasonCard.tsx:app/features/seasons/components/SeasonCard.tsx"
  "app/components/TopSeasonalPosts.tsx:app/features/seasons/components/TopSeasonalPosts.tsx"
  "app/components/BubbleCircle.tsx:app/components/ui/BubbleCircle.tsx"
  "app/components/YearRow.tsx:app/components/charts/YearRow.tsx"
  "app/PageClient.tsx:app/pages/SeasonsPage.tsx"
)

for entry in "${FILES_TO_MOVE[@]}"; do
  IFS=":" read -r src dst <<< "$entry"
  if [ -f "$src" ]; then
    mkdir -p "$(dirname "$dst")"
    mv "$src" "$dst"
    echo "✅ انتقال $src به $dst"
  fi
done

# ساخت فایل axios
cat > app/lib/axios.ts <<EOF
import axios from 'axios';
import { API_BASE_URL } from './constants';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
EOF

# ساخت فایل constants
cat > app/lib/constants.ts <<EOF
export const API_BASE_URL = 'https://kermaneno.ir/wp-json/seasons/v1';
EOF

echo "✅ ساختار جدید با موفقیت ساخته شد!"
