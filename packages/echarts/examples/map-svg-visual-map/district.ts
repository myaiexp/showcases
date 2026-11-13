// A hand-written SVG city plan: nine named district polygons plus an unnamed river, and sample metrics per district
export const DISTRICTS = ['Harbour', 'Old Town', 'Mill Row', 'Westfield', 'Central', 'Eastgate', 'Orchard', 'Lakeside', 'Hilltop'];

// 4x4 corners; neighbours share a corner so the districts tile without gaps.
const XS = [20, 200, 395, 580];
const YS = [20, 140, 262, 380];
const JITTER: [number, number][][] = [
  [[0, 0], [0, 6], [0, -8], [0, 0]],
  [[-10, 0], [14, 12], [-12, -10], [-6, 0]],
  [[12, 0], [-16, 8], [18, -12], [8, 0]],
  [[0, 0], [0, -6], [0, 10], [0, 0]],
];
const corner = (i: number, j: number): string => `${XS[i]! + JITTER[i]![j]![0]},${YS[j]! + JITTER[i]![j]![1]}`;

export const CITY = (() => {
  const polys: string[] = [];
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      const name = DISTRICTS[j * 3 + i]!;
      polys.push(
        `<polygon name="${name}" points="${corner(i, j)} ${corner(i + 1, j)} ${corner(i + 1, j + 1)} ${corner(i, j + 1)}" fill="#33415c" stroke="#161a23" stroke-width="3" />`,
      );
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
  <rect x="0" y="0" width="600" height="400" fill="#161a23" />
  ${polys.join('\n  ')}
  <path d="M10 330 C120 250 200 330 300 230 S470 190 590 60" fill="none" stroke="#5aa3d6" stroke-width="6" opacity="0.7" />
</svg>`;
})();

export const METRICS: Record<string, { unit: string; max: number; values: number[] }> = {
  'Rent (EUR per m2)': { unit: 'EUR', max: 30, values: [24, 28, 14, 12, 29, 18, 16, 22, 9] },
  'Tree cover (%)': { unit: '%', max: 60, values: [4, 6, 11, 33, 3, 18, 55, 40, 48] },
  'Noise (dB)': { unit: 'dB', max: 80, values: [72, 68, 66, 48, 78, 58, 42, 45, 40] },
};
