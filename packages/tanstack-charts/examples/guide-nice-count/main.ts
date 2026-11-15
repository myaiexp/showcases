// nice: false, true or a number: how the domain ends are rounded, even on a hidden axis
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const rows = [3.7, 18.4, 11.2, 40.1, 33.3, 61.8, 52.6, 77.9].map((value, i) => ({ id: `p${i}`, i, value }));
const options = [[false, 'nice: false'], [true, 'nice: true'], [3, 'nice: 3'], [10, 'nice: 10']] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The y axis is hidden: nice still rounds its domain.' });
  const build = (nice: boolean | number) =>
    defineChart({
      marks: [lineY(rows, { x: 'i', y: 'value', stroke: '#fb7185', strokeWidth: 3, points: true })],
      scales: { x: { scale: scaleLinear, axis: false }, y: { scale: scaleLinear, nice, grid: true, axis: false } },
      margin: 12,
    });
  const make = (nice: boolean | number) => ({
    definition: build(nice),
    height: stage.height,
    ariaLabel: 'A small trend line',
    onRender: ({ scene }: { scene: { scales: Readonly<Record<string, { domain: readonly unknown[] }>> } }) => stage.say(`y domain ${JSON.stringify(scene.scales.y?.domain)}`),
  });
  const host = stage.own(mountChart(stage.box, make(options[0][0])));
  const show = (i: number): void => host.update(make(options[i]![0]));
  if (stage.bar) select(stage.bar, 'nice', options.map((o, i) => [i, o[1]] as const), show, 0);
  else stage.cycle(options, 1700, (_, i) => show(i));
  return () => stage.dispose();
};

export default mount;
