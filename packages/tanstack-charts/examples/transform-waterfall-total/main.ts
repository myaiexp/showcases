// waterfall total: true adds a zero-based "total" row at the end
import { barY, defineChart, waterfall } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { lab } from '../../shared/xform-lab.ts';
import { changes } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (total: boolean) => {
    const bridge = waterfall(changes, { value: 'change', total });
    return defineChart({
      marks: [barY(bridge, { x: (row) => (row.kind === 'total' ? 'Total' : row.step), y1: 'start', y2: 'end', color: 'kind' })],
      scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
      color: { domain: ['increase', 'decrease', 'total'], range: ['#4ade80', '#f87171', '#60a5fa'] },
    });
  };
  const states = [[false, 'total: false'], [true, 'total: true']] as const;
  lab(stage, { label: 'total', ariaLabel: 'Cash bridge with an optional total', states, build, ms: 2200, after: (_, name) => stage.say(name) });
  return () => stage.dispose();
};

export default mount;
