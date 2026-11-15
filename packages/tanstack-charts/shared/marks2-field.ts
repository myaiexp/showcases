// A scalar field on a regular grid: a few smooth hills, row-major
export interface Cell {
  col: number;
  row: number;
  height: number;
}

const hills = [
  [0.3, 0.35, 0.16, 9],
  [0.68, 0.6, 0.2, 7],
  [0.5, 0.85, 0.12, 5],
] as const;

export function hillGrid(width = 60, rows = 40): Cell[] {
  const cells: Cell[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < width; col++) {
      const x = col / (width - 1);
      const y = row / (rows - 1);
      let height = 0;
      for (const [cx, cy, s, a] of hills) height += a * Math.exp(-((x - cx) ** 2 + (y - cy) ** 2) / (2 * s * s));
      cells.push({ col, row, height: Math.round(height * 100) / 100 });
    }
  }
  return cells;
}
