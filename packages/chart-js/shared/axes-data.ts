// Sample data for the axes examples: city weather, skills scores, a day-by-day series
import { days, seeded } from './data.ts';

/** Monthly mean temperature (°C) and rainfall (mm) for three cities, Jan to Dec. */
export const CITY_WEATHER: Record<string, { temp: number[]; rain: number[] }> = {
  Helsinki: {
    temp: [-4, -5, -1, 4, 10, 15, 18, 17, 12, 7, 2, -2],
    rain: [50, 36, 33, 36, 38, 58, 68, 82, 65, 78, 68, 60],
  },
  Lisbon: {
    temp: [12, 13, 15, 17, 19, 22, 24, 25, 23, 19, 15, 13],
    rain: [100, 85, 55, 65, 40, 12, 3, 5, 25, 85, 95, 110],
  },
  Singapore: {
    temp: [27, 27, 28, 28, 28, 28, 28, 28, 28, 28, 27, 27],
    rain: [240, 115, 170, 160, 170, 135, 145, 145, 150, 170, 255, 290],
  },
};

/** A hand-made profile on six skills, 0 to 100, for the radar axis examples. */
export const SKILLS = ['Speed', 'Strength', 'Stamina', 'Agility', 'Balance', 'Focus'];
export const SKILL_SCORES = [72, 55, 84, 63, 78, 90];

/** `n` days of a daily value (visitors, say) that drifts with a weekly rhythm. */
export function dailySeries(n: number, start = '2026-01-01', seed = 5): { x: number; y: number }[] {
  const rand = seeded(seed);
  const t = days(n, start);
  let level = 120;
  return t.map((x, i) => {
    level = Math.max(60, level + (rand() - 0.46) * 14);
    const weekend = [0, 6].includes(new Date(x).getUTCDay()) ? -25 : 0;
    return { x, y: Math.round(level + weekend + Math.sin(i / 3) * 6) };
  });
}
