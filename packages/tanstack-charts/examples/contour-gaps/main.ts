// contour with missing cells: null values stay in place as holes instead of shifting the grid
import { defineChart, mountChart } from '@tanstack/charts';
import { contour } from '@tanstack/charts/spatial/contour';
import { scaleSequential } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { heat } from '../../shared/marks2-color.ts';
import { hillGrid } from '../../shared/marks2-field.ts';
import { createStage } from '../../shared/stage.ts';

const grid = hillGrid(60, 40);
// A rectangular patch of the grid has no reading.
const inPatch = (col: number, row: number): boolean => col > 14 && col < 32 && row > 8 && row < 24;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (gaps: boolean) =>
    defineChart({
      svgAnimation: true,
      marks: [
        contour(grid, {
          width: 60,
          height: 40,
          thresholds: 10,
          // Returning null keeps the cell in its position as a missing value.
          value: (cell) => (gaps && inPatch(cell.col, cell.row) ? null : cell.height),
          stroke: '#0b0b0f',
          strokeWidth: 0.5,
        }),
      ],
      scales: { x: null, y: null },
      guides: false,
      color: { scale: scaleSequential(heat).domain([0, 10]) },
    });

  const options = (gaps: boolean) => ({ definition: build(gaps), height: stage.height, ariaLabel: 'Contours with missing cells' });
  const host = stage.own(mountChart(stage.box, options(true)));
  const show = (gaps: boolean): void => {
    host.update(options(gaps));
    stage.say(gaps ? 'A block of cells returns null: the contours stop at its edge.' : 'Every cell has a value.');
  };
  if (stage.bar) checkbox(stage.bar, 'missing patch', true, show);
  else stage.cycle([true, false], 2000, show);
  return () => stage.dispose();
};

export default mount;
