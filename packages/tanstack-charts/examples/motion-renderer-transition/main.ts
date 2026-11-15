// motion({ transition }): the renderer-wide fallback, a spring or a tween
import { barY, defineChart } from '@tanstack/charts';
import { motion } from '@tanstack/charts/motion';
import { mountChartRenderer } from '@tanstack/charts/renderer';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { barStep } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

type T = Parameters<typeof motion>[0] extends infer O ? NonNullable<O extends { transition?: infer X } ? X : never> : never;
const transitions: readonly (readonly [T, string])[] = [
  [{ type: 'spring', stiffness: 170, damping: 14 }, 'spring: stiffness 170, damping 14'],
  [{ type: 'spring', stiffness: 400, damping: 40 }, 'spring: stiff and damped'],
  [{ type: 'tween', duration: 800, easing: 'ease-in-out' }, 'tween: 800 ms ease-in-out'],
  [{ type: 'tween', duration: 300, easing: 'linear' }, 'tween: 300 ms linear'],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a transition: the data alternates every 2.2 seconds.' });
  let step = 0;
  let current = 0;
  const options = () => ({
    definition: defineChart({
      marks: [barY(barStep(step % 2), { x: 'label', y: 'value', key: 'id', fill: '#38bdf8' })],
      scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear().domain([0, 120]), grid: true } },
    }),
    renderer: motion({ transition: transitions[current]![0] }),
    height: stage.height,
    ariaLabel: 'Six values that alternate',
  });
  const host = stage.own(mountChartRenderer(stage.box, options()));
  const run = (): void => {
    step++;
    host.update(options());
  };
  if (stage.bar) {
    select(stage.bar, 'transition', transitions.map(([, l], i) => [i, l] as const), (i) => { current = i; run(); });
    stage.every(2200, run);
  } else {
    stage.cycle(transitions, 2000, ([, label], i) => { current = i; run(); stage.say(label); });
  }
  return () => stage.dispose();
};

export default mount;
