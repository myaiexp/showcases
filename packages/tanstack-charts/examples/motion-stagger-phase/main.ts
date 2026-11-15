// stagger({ phase: ['enter', 'update'] }): a delay on updates is honoured for tweens, ignored for springs
import { barY, defineChart } from '@tanstack/charts';
import { motion } from '@tanstack/charts/motion';
import { stagger } from '@tanstack/charts/motion/definition';
import { mountChartRenderer } from '@tanstack/charts/renderer';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { barStep } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

type Kind = 'tween' | 'spring';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'With a tween the bars update in turn; with a spring they all retarget at once.' });
  let step = 0;
  let kind: Kind = 'tween';
  const options = () => ({
    definition: defineChart({
      motion: {
        transition: kind === 'tween' ? { type: 'tween', duration: 500, easing: 'ease-in-out' } : { type: 'spring', stiffness: 170, damping: 18 },
        ...stagger({ each: 80, phase: ['enter', 'update'] }),
      },
      marks: [barY(barStep(step, 8), { x: 'label', y: 'value', key: 'id', fill: '#2dd4bf' })],
      scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear().domain([0, 110]), grid: true } },
    }),
    renderer: motion(),
    height: stage.height,
    ariaLabel: 'Eight values that change',
  });
  const host = stage.own(mountChartRenderer(stage.box, options()));
  const run = (): void => {
    step++;
    host.update(options());
  };
  const kinds: readonly (readonly [Kind, string])[] = [['tween', 'tween: delays are honoured'], ['spring', 'spring: update delay ignored']];
  if (stage.bar) {
    select(stage.bar, 'transition', kinds, (v) => { kind = v; run(); });
    stage.every(2400, run);
  } else {
    stage.cycle(kinds, 3600, ([k, label]) => { kind = k; stage.say(label); run(); });
    stage.every(1800, run);
  }
  return () => stage.dispose();
};

export default mount;
