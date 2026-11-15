// binXY: separate thresholds per axis and fixed domains
import { scaleLinear as d3Linear } from 'd3-scale';
import { binXY, defineChart, rect } from '@tanstack/charts';
import type { BinXYOptions } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { makeDots, type Dot } from '../../shared/xform-data.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';

const dots = makeDots(500);
type Grid = Omit<BinXYOptions<Dot>, 'x' | 'y' | 'by' | 'outputs'>;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (grid: Grid) => {
    const cells = binXY(dots, { x: 'x', y: 'y', ...grid });
    return defineChart({
      marks: [rect(cells, { x1: 'x1', x2: 'x2', y1: 'y1', y2: 'y2', color: 'value', inset: 0.5 })],
      scales: { x: { scale: scaleLinear }, y: { scale: scaleLinear, grid: false } },
      color: { scale: d3Linear, range: ['#1e293b', '#a78bfa', '#fde047'] },
    });
  };
  const states: readonly (readonly [Grid, string])[] = [
    [{ xThresholds: 6, yThresholds: 4 }, 'xThresholds: 6, yThresholds: 4'],
    [{ xThresholds: 20, yThresholds: 14 }, 'xThresholds: 20, yThresholds: 14'],
    [{ xThresholds: [0, 30, 40, 50, 60, 100], yThresholds: [0, 20, 40, 80] }, 'explicit boundary arrays'],
    [{ xThresholds: 10, yThresholds: 10, xDomain: [30, 70], yDomain: [20, 50] }, 'xDomain [30, 70], yDomain [20, 50]'],
  ];
  lab(stage, { label: 'grid', ariaLabel: 'Cells of x and y', states, build, ms: 2000, after: (_, name) => stage.say(name) });
  return () => stage.dispose();
};

export default mount;
