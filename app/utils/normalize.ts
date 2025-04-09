// utils/normalize.ts
export const normalize = (
    value: number,
    min: number,
    max: number,
    minSize = 10,
    maxSize = 60
  ): number => {
    return ((value - min) / (max - min)) * (maxSize - minSize) + minSize;
  };
  