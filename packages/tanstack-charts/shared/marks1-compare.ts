// Two numeric series that cross several times, for difference and comparison examples
export interface Comparison {
  day: number;
  forecast: number;
  actual: number;
}

/** Forecast and actual orders per day: actual wanders around the forecast line. */
export function forecastVsActual(n = 28): Comparison[] {
  return Array.from({ length: n }, (_, day) => {
    const forecast = 50 + day * 0.8;
    const actual = forecast + 12 * Math.sin(day / 2.6) + 4 * Math.cos(day * 1.3);
    return { day, forecast: Math.round(forecast * 10) / 10, actual: Math.round(actual * 10) / 10 };
  });
}
