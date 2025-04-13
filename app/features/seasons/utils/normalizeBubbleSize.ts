// utils/normalize.ts
export const normalize = (
  value: number,
  min: number,
  max: number,
  minSize = 10,
  maxSize = 60
): number => {
  if (max === min) return (minSize + maxSize) / 2;
  return ((value - min) / (max - min)) * (maxSize - minSize) + minSize;
};