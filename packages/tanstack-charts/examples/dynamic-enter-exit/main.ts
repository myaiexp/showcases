// Keyed reconciliation: added rows enter, removed rows exit, the rest tween
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { revenue } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Add or remove a month: the other bars keep their identity.' });
  let count = 4;
  const build = () =>
    defineChart({
      svgAnimation: { duration: 600, easing: 'ease-out' },
      marks: [barY(revenue.slice(0, count), { x: 'month', y: 'revenue', key: 'id', fill: '#34d399' })],
      scales: {
        x: { scale: () => scaleBand<string>().domain(revenue.map((r) => r.month)).padding(0.2) },
        y: { scale: () => scaleLinear().domain([0, 80_000]), grid: true },
      },
    });
  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Monthly revenue' });
  const host = stage.own(mountChart(stage.box, options()));
  const set = (n: number): void => {
    count = Math.max(1, Math.min(revenue.length, n));
    host.update(options());
    stage.say(`${count} rows`);
  };
  if (stage.bar) {
    button(stage.bar, 'add a month', () => set(count + 1));
    button(stage.bar, 'remove a month', () => set(count - 1));
  } else stage.cycle([4, 5, 6, 3, 4], 1100, set);
  return () => stage.dispose();
};

export default mount;
