// One dataset, one channel mapping, five mark choices: the mark picks the geometry
import { areaY, barY, defineChart, dot, lineY, mountChart, type ChartMark } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { signups } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Only the mark function changes between charts.' });

  const channels = { x: 'month', y: 'value' } as const;
  const kinds: readonly (readonly [string, () => ChartMark<any, any, any>])[] = [
    ['lineY', () => lineY(signups, channels)],
    ['areaY', () => areaY(signups, channels)],
    ['barY', () => barY(signups, channels)],
    ['dot', () => dot(signups, { ...channels, r: 5 })],
  ];

  const build = (mark: ChartMark<any, any, any>) =>
    defineChart({
      marks: [mark],
      scales: {
        x: { scale: () => scaleBand<string>().padding(0.2) },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
      tooltip,
    });

  const options = { definition: build(kinds[0]![1]()), height: stage.height, ariaLabel: 'Signups drawn with different marks' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (make: () => ChartMark<any, any, any>, name: string): void => {
    host.update({ ...options, definition: build(make()) });
    stage.say(name);
  };
  if (stage.bar) {
    select(stage.bar, 'mark', kinds.map(([name, make]) => [make, name] as const), (make) => show(make, ''));
  } else {
    stage.cycle(kinds, 1600, ([name, make]) => show(make, name));
  }
  return () => stage.dispose();
};

export default mount;
