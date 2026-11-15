// stackRowsX: horizontal stack endpoints drawn with rect
import { defineChart, rect, stackRowsX } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { lab } from '../../shared/xform-lab.ts';
import { quarters } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a segment.' });

  const build = (reverse: boolean) => {
    const rows = stackRowsX(quarters, { x: 'revenue', y: 'quarter', z: 'product', reverse });
    return defineChart({
      marks: [rect(rows, { x1: 'x1', x2: 'x2', y: 'y', color: 'z', inset: 1 })],
      scales: { x: { scale: scaleLinear, nice: true, grid: true }, y: { scale: () => scaleBand<string>().padding(0.2) } },
      tooltip,
    });
  };
  const states = [[false, 'reverse: false'], [true, 'reverse: true']] as const;
  lab(stage, { label: 'reverse', ariaLabel: 'Horizontal stack from stackRowsX', states, build, after: (_, name) => stage.say(`stackRowsX, ${name}`) });
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;
