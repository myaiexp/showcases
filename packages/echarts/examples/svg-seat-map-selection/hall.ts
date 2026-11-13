// A cinema hall drawn as an SVG string: a screen and 6 rows of 8 named seats, some already taken
import { rng } from '../../shared/scatter-data.ts';

export const ROWS = ['A', 'B', 'C', 'D', 'E', 'F'];
export const COLS = 8;
export const PRICE: Record<string, number> = { A: 16, B: 16, C: 12, D: 12, E: 9, F: 9 };

export const seatName = (row: string, col: number): string => `${row}${col + 1}`;

const r = rng(3);
/** Seats that are sold already, decided once with a seeded generator. */
export const TAKEN = new Set(ROWS.flatMap((row) => Array.from({ length: COLS }, (_, c) => seatName(row, c))).filter(() => r() < 0.3));

/** Only elements with a `name` attribute become regions; the aisle and walls are plain drawing. */
export const HALL = (() => {
  const seats: string[] = [];
  ROWS.forEach((row, ri) => {
    for (let c = 0; c < COLS; c++) {
      // A 24px aisle after the fourth seat.
      const x = 30 + c * 52 + (c >= 4 ? 24 : 0);
      const y = 100 + ri * 44;
      seats.push(`<rect name="${seatName(row, c)}" x="${x}" y="${y}" width="42" height="34" rx="8" fill="#33415c" />`);
    }
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 380">
  <rect x="0" y="0" width="500" height="380" fill="#161a23" />
  <rect name="Screen" x="40" y="24" width="420" height="22" rx="6" fill="#c8d2e8" />
  <path d="M10 10 H490 V370 H10 Z" fill="none" stroke="#3a4150" stroke-width="3" />
  ${seats.join('\n  ')}
</svg>`;
})();
