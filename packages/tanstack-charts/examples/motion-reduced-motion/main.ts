// motion({ respectReducedMotion }): snaps when the system asks for less motion, unless turned off
import { barY, defineChart } from '@tanstack/charts';
import { motion } from '@tanstack/charts/motion';
import { mountChartRenderer } from '@tanstack/charts/renderer';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { barStep } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Turn reduced motion on in your system settings to see the bars snap.' });
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  let respect = true;
  let step = 0;
  const options = () => ({
    definition: defineChart({
      marks: [barY(barStep(step), { x: 'label', y: 'value', key: 'id', fill: '#a3e635' })],
      scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: () => scaleLinear().domain([0, 110]), grid: true } },
    }),
    renderer: motion({ respectReducedMotion: respect, transition: { type: 'spring', stiffness: 170, damping: 14 } }),
    height: stage.height,
    ariaLabel: 'Six values that change',
  });
  const host = stage.own(mountChartRenderer(stage.box, options()));
  const say = (): void => stage.say(`prefers-reduced-motion: ${query.matches ? 'reduce' : 'no-preference'}   respectReducedMotion: ${respect}`);
  say();
  stage.every(2000, () => {
    step++;
    host.update(options());
  });
  if (stage.bar) checkbox(stage.bar, 'respectReducedMotion', true, (v) => { respect = v; say(); });
  return () => stage.dispose();
};

export default mount;
