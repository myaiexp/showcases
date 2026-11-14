// Sample data for the round, radar, bubble, scatter and mixed chart examples
import { PALETTE, alpha } from './data.ts';

/** Slice border that matches the dark page, so slices read as separate pieces. */
export const SLICE_BORDER = '#18181b';

/** One translucent colour per slice. */
export function sliceColors(n: number, a = 0.85): string[] {
  return Array.from({ length: n }, (_, i) => alpha(PALETTE[i % PALETTE.length]!, a));
}

/** A household budget (% of take-home pay) in three months: the shares shift. */
export const BUDGET_LABELS = ['Rent', 'Food', 'Transport', 'Savings', 'Fun'];
export const BUDGET: Record<string, number[]> = {
  January: [38, 22, 12, 18, 10],
  February: [38, 24, 10, 12, 16],
  March: [38, 20, 16, 20, 6],
};

/** Mean wind speed (m/s) by compass direction, per season. */
export const WIND_LABELS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
export const WIND: Record<string, number[]> = {
  Winter: [4.1, 2.8, 2.2, 3.4, 5.6, 7.2, 6.1, 4.6],
  Spring: [5.2, 4.4, 3.1, 2.6, 3.3, 4.8, 5.9, 5.7],
  Summer: [3.0, 2.4, 2.0, 2.2, 3.1, 5.3, 6.4, 4.0],
  Autumn: [3.6, 2.5, 2.9, 4.2, 6.0, 7.5, 5.8, 4.1],
};

/** Weekly minutes of exercise by activity. */
export const ACTIVITY_LABELS = ['Walking', 'Cycling', 'Swimming', 'Yoga', 'Gym', 'Running'];
export const ACTIVITY = [210, 120, 45, 80, 150, 95];

/** Skill profiles (0 to 100) for the radar examples. */
export const SKILL_LABELS = ['Speed', 'Strength', 'Stamina', 'Passing', 'Shooting', 'Defence'];
export const PLAYERS: Record<string, number[]> = {
  Ava: [88, 52, 74, 81, 60, 45],
  Ben: [58, 90, 70, 48, 77, 86],
  Caro: [72, 66, 92, 90, 54, 62],
  Dev: [95, 40, 55, 60, 91, 35],
};

/** Café ratings (1 to 5) for the radar scale examples. */
export const CAFE_LABELS = ['Coffee', 'Price', 'Service', 'Speed', 'Ambience', 'Seating', 'Wi-Fi'];
export const CAFE = [4.6, 3.4, 4.1, 3.2, 4.4, 3.7, 4.8];

export interface City {
  name: string;
  /** Average income, thousand euro a year. */
  income: number;
  /** Rent, euro per square metre per month. */
  rent: number;
  /** Population in millions. */
  pop: number;
}

/** Eight cities: income across, rent up, population as the bubble size. */
export const CITIES: Record<string, City[]> = {
  2020: [
    { name: 'Oslo', income: 52, rent: 21, pop: 0.7 },
    { name: 'Lisbon', income: 24, rent: 14, pop: 0.5 },
    { name: 'Berlin', income: 38, rent: 12, pop: 3.6 },
    { name: 'Madrid', income: 29, rent: 15, pop: 3.3 },
    { name: 'Vienna', income: 41, rent: 13, pop: 1.9 },
    { name: 'Warsaw', income: 22, rent: 11, pop: 1.8 },
    { name: 'Paris', income: 47, rent: 29, pop: 2.2 },
    { name: 'Rome', income: 30, rent: 16, pop: 2.8 },
  ],
  2023: [
    { name: 'Oslo', income: 56, rent: 24, pop: 0.7 },
    { name: 'Lisbon', income: 27, rent: 19, pop: 0.55 },
    { name: 'Berlin', income: 42, rent: 16, pop: 3.7 },
    { name: 'Madrid', income: 31, rent: 17, pop: 3.3 },
    { name: 'Vienna', income: 44, rent: 15, pop: 2.0 },
    { name: 'Warsaw', income: 26, rent: 14, pop: 1.8 },
    { name: 'Paris', income: 50, rent: 31, pop: 2.1 },
    { name: 'Rome', income: 32, rent: 17, pop: 2.8 },
  ],
  2026: [
    { name: 'Oslo', income: 61, rent: 27, pop: 0.72 },
    { name: 'Lisbon', income: 31, rent: 24, pop: 0.57 },
    { name: 'Berlin', income: 46, rent: 19, pop: 3.8 },
    { name: 'Madrid', income: 34, rent: 20, pop: 3.4 },
    { name: 'Vienna', income: 47, rent: 17, pop: 2.0 },
    { name: 'Warsaw', income: 31, rent: 17, pop: 1.9 },
    { name: 'Paris', income: 53, rent: 33, pop: 2.1 },
    { name: 'Rome', income: 34, rent: 18, pop: 2.8 },
  ],
};

/** Sample countries: GDP per person (k$) across, life expectancy up, population (millions). */
export const COUNTRIES = [
  { name: 'Brazil', gdp: 10, life: 75, pop: 216 },
  { name: 'India', gdp: 2.5, life: 70, pop: 1428 },
  { name: 'Nigeria', gdp: 2.2, life: 53, pop: 224 },
  { name: 'Germany', gdp: 52, life: 81, pop: 84 },
  { name: 'USA', gdp: 76, life: 78, pop: 335 },
  { name: 'Japan', gdp: 34, life: 84, pop: 124 },
  { name: 'Kenya', gdp: 2.1, life: 62, pop: 55 },
  { name: 'Chile', gdp: 17, life: 79, pop: 19.5 },
];

/** Phone apps: price across, rating up, reviews (hundreds) as the bubble size. */
export const APPS = [
  { name: 'Notes', price: 0, rating: 4.1, reviews: 18 },
  { name: 'Photo editor', price: 5, rating: 4.4, reviews: 42 },
  { name: 'Fitness', price: 8, rating: 3.8, reviews: 30 },
  { name: 'Maps', price: 0, rating: 4.6, reviews: 66 },
  { name: 'Language', price: 12, rating: 4.7, reviews: 25 },
  { name: 'Puzzle game', price: 3, rating: 4.2, reviews: 54 },
  { name: 'Budget', price: 7, rating: 3.5, reviews: 12 },
];

/** Months and climates for the bar-and-line chart. */
export const CLIMATES: Record<string, { rain: number[]; temp: number[] }> = {
  Helsinki: {
    rain: [50, 36, 35, 38, 36, 66, 72, 82, 66, 74, 66, 58],
    temp: [-4, -5, -1, 5, 11, 15, 18, 17, 12, 7, 2, -2],
  },
  Lisbon: {
    rain: [111, 76, 109, 54, 44, 16, 3, 7, 33, 62, 93, 103],
    temp: [12, 13, 15, 17, 19, 23, 25, 26, 24, 20, 15, 13],
  },
  Singapore: {
    rain: [243, 161, 177, 170, 171, 135, 148, 144, 138, 167, 252, 256],
    temp: [27, 27, 28, 28, 28, 28, 28, 28, 28, 28, 27, 27],
  },
};

/** Least-squares line through points: the two end points of the trend. */
export function trendLine(points: { x: number; y: number }[]): { x: number; y: number }[] {
  const n = points.length;
  const mx = points.reduce((s, p) => s + p.x, 0) / n;
  const my = points.reduce((s, p) => s + p.y, 0) / n;
  let num = 0;
  let den = 0;
  for (const p of points) {
    num += (p.x - mx) * (p.y - my);
    den += (p.x - mx) ** 2;
  }
  const slope = den ? num / den : 0;
  const xs = points.map((p) => p.x);
  const x0 = Math.min(...xs);
  const x1 = Math.max(...xs);
  return [
    { x: x0, y: my + slope * (x0 - mx) },
    { x: x1, y: my + slope * (x1 - mx) },
  ];
}
