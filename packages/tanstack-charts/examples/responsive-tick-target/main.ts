// Default tick density: the target follows the axis length, the scale may return a nearby count
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { breathe } from '../../shared/style-box.ts';
import { rng, walk } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const rows = walk(rng(31), 60, 50, 3).map((value, i) => ({ id: `p${i}`, i, value }));
const clamp = (lo: number, v: number, hi: number): number => Math.min(hi, Math.max(lo, v));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Resize the box: wider axes get more ticks, up to 8 on x and 7 on y.' });

  const definition = defineChart({
    marks: [lineY(rows, { x: 'i', y: 'value', stroke: '#4ade80' })],
    scales: {
      x: { scale: scaleLinear, grid: true },
      y: { scale: scaleLinear, grid: true },
    },
  });
  stage.own(
    mountChart(stage.box, {
      definition,
      height: stage.height,
      ariaLabel: 'Random walk',
      onRender: ({ scene }) => {
        const xTarget = clamp(2, Math.floor(scene.chart.width / 92), 8);
        const yTarget = clamp(2, Math.floor(scene.chart.height / 48), 7);
        const got = (id: string): number => scene.scales[id]?.ticks.length ?? 0;
        stage.say(`x target ${xTarget}, got ${got('x')}    y target ${yTarget}, got ${got('y')}`);
      },
    }),
  );
  if (stage.bar) slider(stage.bar, 'container width', 25, 100, 1, 100, (v) => { stage.box.style.width = `${v}%`; }, (v) => `${v}%`);
  else breathe(stage, 30, 100, 7000);
  return () => stage.dispose();
};

export default mount;
