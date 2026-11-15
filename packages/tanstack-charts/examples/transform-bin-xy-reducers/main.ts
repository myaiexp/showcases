// binXY outputs: the same cells reduced by count, sum or mean of a weight field
import { scaleLinear as d3Linear } from 'd3-scale';
import { binXY, defineChart, rect } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { makeDots } from '../../shared/xform-data.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';

const dots = makeDots(500);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a cell for its value.' });

  const build = (reduce: 'count' | 'sum' | 'mean') => {
    const cells = binXY(dots, {
      x: 'x',
      y: 'y',
      xThresholds: 12,
      yThresholds: 9,
      outputs: { cell: reduce === 'count' ? { reduce } : { value: 'weight', reduce } },
    });
    return defineChart({
      marks: [rect(cells, { x1: 'x1', x2: 'x2', y1: 'y1', y2: 'y2', color: 'cell', inset: 0.5 })],
      scales: {
        x: { scale: scaleLinear, axis: { label: 'x' } },
        y: { scale: scaleLinear, grid: false, axis: { label: 'y' } },
      },
      color: { scale: d3Linear, range: ['#1e293b', '#38bdf8', '#fde047'] },
      tooltip,
    });
  };
  const states = [['count', "cell: { reduce: 'count' }"], ['sum', "cell: { value: 'weight', reduce: 'sum' }"], ['mean', "cell: { value: 'weight', reduce: 'mean' }"]] as const;
  lab(stage, { label: 'reducer', ariaLabel: 'Cells of x and y', states, build, after: (_, name) => stage.say(name) });
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
