// Explicit margins lock only the sides you give: { left: 80 } keeps the other sides automatic, 0 locks all four
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { signups } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

type Margin = undefined | number | { left?: number; top?: number; right?: number; bottom?: number };
const margins: readonly (readonly [Margin, string])[] = [
  [undefined, 'margin omitted (all automatic)'],
  [{ left: 80 }, 'margin: { left: 80 }'],
  [{ left: 20, bottom: 60, top: 30 }, 'margin: { left: 20, bottom: 60, top: 30 }'],
  [0, 'margin: 0 (every side locked to zero)'],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const build = (margin: Margin) =>
    defineChart({
      marks: [lineY(signups, { x: 'month', y: 'value', stroke: '#60a5fa', points: true })],
      scales: {
        x: { scale: () => scalePoint<string>().padding(0.2), axis: { label: 'Month' } },
        y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Signups' } },
      },
      ...(margin === undefined ? {} : { margin }),
    });

  const options = (margin: Margin, label: string) => ({
    definition: build(margin),
    height: stage.height,
    ariaLabel: 'Signups',
    onRender: ({ scene }: { scene: { chart: { x: number; y: number; width: number; height: number } } }) => {
      const c = scene.chart;
      stage.say(`${label}\nplot: x ${c.x.toFixed(0)}, y ${c.y.toFixed(0)}, ${c.width.toFixed(0)} x ${c.height.toFixed(0)}`);
    },
  });
  const host = stage.own(mountChart(stage.box, options(undefined, margins[0]![1])));
  const show = (margin: Margin, label: string): void => host.update(options(margin, label));
  if (stage.bar) {
    const sel = select(stage.bar, 'margin', margins.map(([m, l], i) => [i, l] as const), (i) => show(margins[i]![0], margins[i]![1]));
    void sel;
  } else stage.cycle(margins, 1900, ([m, l]) => show(m, l));
  return () => stage.dispose();
};

export default mount;
