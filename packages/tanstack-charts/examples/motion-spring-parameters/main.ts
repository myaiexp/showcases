// Spring parameters: stiffness, damping and mass, set on the chart motion policy
import { barY, defineChart } from '@tanstack/charts';
import { motion } from '@tanstack/charts/motion';
import { mountChartRenderer } from '@tanstack/charts/renderer';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { barStep } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const presets = [
  { stiffness: 170, damping: 26, mass: 1 },
  { stiffness: 170, damping: 8, mass: 1 },
  { stiffness: 400, damping: 20, mass: 1 },
  { stiffness: 170, damping: 14, mass: 4 },
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change a parameter: the next update uses it.' });
  let step = 0;
  let spring: { stiffness: number; damping: number; mass: number } = { ...presets[0] };
  const options = () => ({
    definition: defineChart({
      motion: { transition: { type: 'spring', ...spring } },
      marks: [barY(barStep(step % 2), { x: 'label', y: 'value', key: 'id', fill: '#f472b6' })],
      scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: scaleLinear().domain([0, 120]), grid: true } },
    }),
    renderer: motion(),
    height: stage.height,
    ariaLabel: 'Six values that alternate',
  });
  const host = stage.own(mountChartRenderer(stage.box, options()));
  const run = (): void => {
    step++;
    host.update(options());
  };
  if (stage.bar) {
    slider(stage.bar, 'stiffness', 50, 600, 10, spring.stiffness, (v) => { spring = { ...spring, stiffness: v }; }, String);
    slider(stage.bar, 'damping', 2, 60, 1, spring.damping, (v) => { spring = { ...spring, damping: v }; }, String);
    slider(stage.bar, 'mass', 0.5, 6, 0.5, spring.mass, (v) => { spring = { ...spring, mass: v }; }, String);
    stage.every(2200, run);
  } else {
    stage.cycle(presets, 2000, (p) => { spring = { ...p }; run(); stage.say(`stiffness ${p.stiffness}, damping ${p.damping}, mass ${p.mass}`); });
  }
  return () => stage.dispose();
};

export default mount;
