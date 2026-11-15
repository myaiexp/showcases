// The same definition under the default renderer (svgAnimation) and under motion() (definition motion)
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { motion } from '@tanstack/charts/motion';
import { mountChartRenderer } from '@tanstack/charts/renderer';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { barStep } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

type Owner = 'default' | 'motion';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Switch the owner: the data keeps alternating, only the animation changes.' });
  let step = 0;
  let host: { update(o: never): void; destroy(): void } | undefined;
  let owner: Owner = 'default';
  const definition = () =>
    defineChart({
      svgAnimation: { duration: 1600, easing: 'ease-in-out' },
      motion: { transition: { type: 'spring', stiffness: 260, damping: 20 } },
      marks: [barY(barStep(step % 2), { x: 'label', y: 'value', key: 'id', fill: '#c084fc' })],
      scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: () => scaleLinear().domain([0, 110]), grid: true } },
    });
  const base = () => ({ definition: definition(), height: stage.height, ariaLabel: 'Six values that alternate' });
  const start = (o: Owner): void => {
    host?.destroy();
    owner = o;
    host = o === 'default' ? mountChart(stage.box, base()) : mountChartRenderer(stage.box, { ...base(), renderer: motion() });
    stage.say(o === 'default' ? 'default renderer: svgAnimation, 1600 ms tween' : 'motion(): definition motion, spring');
  };
  start('default');
  stage.onDispose(() => host?.destroy());
  stage.every(2200, () => {
    step++;
    (host as { update(o: unknown): void }).update(owner === 'default' ? base() : { ...base(), renderer: motion() });
  });
  const owners: readonly (readonly [Owner, string])[] = [['default', 'default renderer'], ['motion', 'motion()']];
  if (stage.bar) select(stage.bar, 'animation owner', owners, start);
  else stage.cycle(owners, 6600, ([o]) => start(o));
  return () => stage.dispose();
};

export default mount;
