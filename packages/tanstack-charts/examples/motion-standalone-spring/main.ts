// createChartSpring: sampled step responses of four spring parameter sets drawn as lines
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { sampleSpring } from '../../shared/style-spring.ts';
import { createStage } from '../../shared/stage.ts';

const sets = [
  ['default (170, 26, 1)', { stiffness: 170, damping: 26, mass: 1 }],
  ['ringing (170, 8, 1)', { stiffness: 170, damping: 8, mass: 1 }],
  ['stiff (500, 30, 1)', { stiffness: 500, damping: 30, mass: 1 }],
  ['heavy (170, 26, 4)', { stiffness: 170, damping: 26, mass: 4 }],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each line is spring.sample(ms, { from: 0, to: 100 }).value.' });
  const sampled = sets.map(([label, options]) => ({ label, ...sampleSpring(label, options, 3000, 30) }));
  const rows = sampled.flatMap((s) => s.rows);
  const definition = defineChart({
    marks: [lineY(rows, { x: 'ms', y: 'value', z: 'label', strokeWidth: 2 })],
    scales: {
      x: { scale: scaleLinear, axis: { label: 'elapsed (ms)', ticks: { format: (v: number) => `${v}` } } },
      y: { scale: scaleLinear, grid: true, axis: { label: 'value' } },
    },
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Four spring step responses over three seconds' }));
  if (!stage.preview) {
    stage.readout().textContent = sampled.map((s) => `${s.label}: at rest after ${s.doneAt ?? '>3000'} ms`).join('\n');
  } else stage.say('four step responses, 0 to 100');
  return () => stage.dispose();
};

export default mount;
