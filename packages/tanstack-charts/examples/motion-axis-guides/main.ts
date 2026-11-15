// Per-guide motion on the y axis: grid, tick rules, tick labels and title each get their own policy
import { barY, defineChart } from '@tanstack/charts';
import { motion } from '@tanstack/charts/motion';
import { mountChartRenderer } from '@tanstack/charts/renderer';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The data jumps between two scales; guides animate on their own policy.' });
  let flip = 0;
  let custom = true;
  const options = () => ({
    definition: defineChart({
      motion: { transition: { type: 'tween', duration: 300, easing: 'linear' } },
      marks: [barY(['A', 'B', 'C', 'D', 'E'].map((label, i) => ({ id: label, label, value: (i + 2) * (flip % 2 ? 40 : 9) })), { x: 'label', y: 'value', key: 'id', fill: '#a78bfa' })],
      scales: {
        x: { scale: () => scaleBand<string>().padding(0.25) },
        y: {
          scale: scaleLinear,
          nice: true,
          grid: true,
          axis: custom
            ? {
                motion: { transition: { type: 'spring', stiffness: 120, damping: 14 } },
                ticks: { motion: { transition: { type: 'tween', duration: 900, easing: 'ease-out' } } },
                tickLabels: { motion: { delay: 150 } },
                label: { text: 'Value', motion: { transition: { type: 'tween', duration: 1200 } } },
              }
            : { label: 'Value' },
        },
      },
    }),
    renderer: motion(),
    height: stage.height,
    ariaLabel: 'Five values on a rescaling axis',
  });
  const host = stage.own(mountChartRenderer(stage.box, options()));
  const run = (): void => {
    flip++;
    host.update(options());
  };
  stage.every(2600, run);
  if (stage.bar) checkbox(stage.bar, 'guide motion policies', true, (v) => { custom = v; });
  return () => stage.dispose();
};

export default mount;
