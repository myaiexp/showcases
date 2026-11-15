// tooltip.motion: inherit the chart spring, override it, or switch it off
import { barY, defineChart } from '@tanstack/charts';
import { motion } from '@tanstack/charts/motion';
import { mountChartRenderer } from '@tanstack/charts/renderer';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { revenue } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

type Mode = 'inherit' | 'slow' | 'off';
const modes: readonly (readonly [Mode, string])[] = [['inherit', 'inherits the chart spring'], ['slow', 'tooltip.motion: slow spring'], ['off', 'tooltip.motion: false']];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move across the bars and change the tooltip motion.' });
  let mode: Mode = 'inherit';
  const options = () => ({
    definition: defineChart({
      motion: { transition: { type: 'spring', stiffness: 260, damping: 18 } },
      marks: [barY(revenue, { x: 'month', y: 'revenue', fill: '#60a5fa' })],
      scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
      tooltip: mode === 'inherit' ? tooltip : { use: tooltip, motion: mode === 'off' ? (false as const) : { type: 'spring' as const, stiffness: 60, damping: 8 } },
    }),
    renderer: motion(),
    height: stage.height,
    ariaLabel: 'Monthly revenue',
  });
  const host = stage.own(mountChartRenderer(stage.box, options()));
  const apply = (m: Mode): void => {
    mode = m;
    host.update(options());
  };
  if (stage.bar) select(stage.bar, 'tooltip motion', modes, apply);
  else stage.cycle(modes, 3000, ([m, label]) => { apply(m); stage.say(label); });
  stage.ghost(undefined, 3000);
  return () => stage.dispose();
};

export default mount;
