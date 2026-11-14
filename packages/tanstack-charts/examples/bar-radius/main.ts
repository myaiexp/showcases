// barY radius: uniform, physical tuple, semantic end, and per-segment stack rounding
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { sales } from '../../shared/marks1-data.ts';
import { createStage } from '../../shared/stage.ts';

type Radius = NonNullable<Parameters<typeof barY>[1]>['radius'];

const forms: readonly (readonly [Radius, string])[] = [
  [8, 'radius: 8'],
  [[10, 10, 0, 0], 'radius: [10, 10, 0, 0]'],
  [[0, 0, 10, 10], 'radius: [0, 0, 10, 10]'],
  [{ end: 10 }, 'radius: { end: 10 } (stacked: outer end only)'],
  [{ end: 10, stack: 'each' }, "radius: { end: 10, stack: 'each' }"],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const chart = (radius: Radius) =>
    defineChart({
      marks: [barY(sales, { x: 'quarter', y: 'revenue', color: 'region', radius })],
      scales: {
        x: { scale: () => scaleBand<string>().padding(0.3) },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
    });

  const options = { definition: chart(forms[0]![0]), height: stage.height, initialWidth: 640, ariaLabel: 'Stacked bars with rounded corners' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (i: number): void => {
    host.update({ ...options, definition: chart(forms[i]![0]) });
    stage.say(forms[i]![1]);
  };

  if (stage.bar) {
    select(stage.bar, 'radius', forms.map((f, i) => [i, f[1]] as const), show);
    stage.say(forms[0]![1]);
  } else stage.cycle(forms.map((_, i) => i), 1800, show);
  return () => stage.dispose();
};

export default mount;
