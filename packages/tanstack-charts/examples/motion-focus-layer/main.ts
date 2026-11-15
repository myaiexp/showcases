// whenFocused: a focus indicator that is visible during entrance motion, unlike inline states
import { barY, defineChart, dot, whenFocused } from '@tanstack/charts';
import { motion } from '@tanstack/charts/motion';
import { mountChartRenderer } from '@tanstack/charts/renderer';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { revenue } from '../../shared/style-data.ts';
import { replayer } from '../../shared/style-replay.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Replay and hover while the bars are still rising: the ring is already there.' });
  const replay = replayer(stage, () =>
    mountChartRenderer(stage.box, {
      definition: defineChart({
        marks: [
          barY(revenue, { id: 'bars', x: 'month', y: 'revenue', key: 'id', fill: '#1d4ed8' }),
          whenFocused(dot(revenue, { id: 'focus-dots', x: 'month', y: 'revenue', r: 8, fill: '#facc15', stroke: '#fff', strokeWidth: 2 }), { match: 'x' }),
        ],
        scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear, nice: true, grid: true } },
      }),
      renderer: motion({ transition: { type: 'tween', duration: 1800, easing: 'ease-out' } }),
      height: stage.height,
      ariaLabel: 'Monthly revenue',
    }),
  );
  replay();
  if (stage.bar) button(stage.bar, 'replay entrance', replay);
  else {
    stage.every(3600, replay);
    stage.ghost(undefined, 3600);
  }
  return () => stage.dispose();
};

export default mount;
