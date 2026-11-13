// Generated daily OHLC and volume series shared by the candlestick examples (data only)
export interface Stock {
  dates: string[];
  /** Rows in candlestick's default order: [open, close, lowest, highest]. */
  oclh: number[][];
  volume: number[];
}

/** Seeded random walk, so every mount draws the same chart. */
export function makeStock(days: number, seed = 7, start = 100): Stock {
  let s = seed;
  const rnd = (): number => ((s = (s * 16807) % 2147483647) / 2147483647);
  const dates: string[] = [];
  const oclh: number[][] = [];
  const volume: number[] = [];
  let price = start;
  for (let i = 0; i < days; i++) {
    const open = price;
    // Every 9th day closes exactly at the open: a doji.
    const close = i % 9 === 4 ? open : Math.max(10, open + (rnd() - 0.47) * 7);
    const low = Math.min(open, close) - rnd() * 2.5;
    const high = Math.max(open, close) + rnd() * 2.5;
    oclh.push([+open.toFixed(2), +close.toFixed(2), +low.toFixed(2), +high.toFixed(2)]);
    volume.push(Math.round(800 + rnd() * 1200 + Math.abs(close - open) * 220));
    dates.push(new Date(Date.UTC(2026, 2, 2 + i)).toISOString().slice(0, 10));
    price = close;
  }
  return { dates, oclh, volume };
}

/** Simple moving average of the closing prices; the first n-1 entries are '-' (no value). */
export function movingAverage(oclh: number[][], n: number): (number | string)[] {
  return oclh.map((_, i) => {
    if (i < n - 1) return '-';
    let sum = 0;
    for (let j = 0; j < n; j++) sum += oclh[i - j]![1]!;
    return +(sum / n).toFixed(2);
  });
}
