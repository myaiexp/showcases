// The default theme is currentColor: the container's CSS color and background restyle the chart
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { downloads } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const looks = [
  ['#e6edf7', '#111827', 'dark: color #e6edf7'],
  ['#172033', '#ffffff', 'light: color #172033'],
  ['#fde68a', '#3b2a05', 'amber: color #fde68a'],
] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a look: only the box CSS changes. The definition has no theme.' });
  const definition = defineChart({
    marks: [lineY(downloads, { x: 'week', y: 'downloads', z: 'package', strokeWidth: 2.5 })],
    scales: {
      x: { scale: () => scalePoint<string>().padding(0.2), axis: { label: 'Week' } },
      y: { scale: scaleLinear, grid: true, axis: { label: 'Downloads' } },
    },
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Weekly downloads for three packages' }));
  stage.box.style.padding = '8px';
  stage.box.style.borderRadius = '6px';
  const apply = (i: number): void => {
    const [color, background, label] = looks[i]!;
    stage.box.style.color = color;
    stage.box.style.background = background;
    stage.say(label);
  };
  if (stage.bar) select(stage.bar, 'container', looks.map((l, i) => [i, l[2]] as const), apply);
  stage.cycle(looks, 2000, (_, i) => apply(i), stage.preview);
  return () => stage.dispose();
};

export default mount;
