// Twelve months of actual and forecast revenue with stable ids, for motion examples
export interface ForecastRow {
  id: string;
  month: number;
  actual: number;
  forecast: number;
}

/** `variant` shifts the curves so each update has something to move. */
export function forecastRows(variant = 0): ForecastRow[] {
  return Array.from({ length: 12 }, (_, i) => ({
    id: `m${i}`,
    month: i,
    actual: Math.round(50 + 22 * Math.sin((i + variant * 2) / 2) + i * 2),
    forecast: Math.round(54 + 16 * Math.cos((i + variant * 3) / 3) + i * 2.4),
  }));
}
