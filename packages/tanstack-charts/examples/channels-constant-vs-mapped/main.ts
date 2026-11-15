// Three ways to colour bars: a constant, a colour channel through a scale, a per-row accessor
import { barX, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { products } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = products.map((p) => ({ ...p, flagged: p.returns > 15, tier: p.revenue > 150 ? 'Large' : 'Small' }));
type Mode = 'constant' | 'channel' | 'accessor';
const modes: readonly (readonly [Mode, string])[] = [
  ['constant', "fill: '#60a5fa' (constant)"],
  ['channel', "color: 'tier' (channel, colour scale)"],
  ['accessor', 'fill: row => ... (visual accessor)'],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (mode: Mode) => {
    const common = { x: 'revenue', y: 'product' } as const;
    const mark =
      mode === 'constant'
        ? barX(rows, { ...common, fill: '#60a5fa' })
        : mode === 'channel'
          ? barX(rows, { ...common, color: 'tier' })
          : barX(rows, { ...common, fill: (row) => (row.flagged ? '#f87171' : '#94a3b8') });
    return defineChart({
      marks: [mark],
      scales: {
        x: { scale: scaleLinear, nice: true, grid: true },
        y: { scale: () => scaleBand<string>().padding(0.15) },
      },
      tooltip,
    });
  };

  const options = (mode: Mode) => ({ definition: build(mode), height: stage.height, ariaLabel: 'Revenue by product' });
  const host = stage.own(mountChart(stage.box, options('constant')));
  const show = (mode: Mode, label: string): void => {
    host.update(options(mode));
    stage.say(label);
  };
  if (stage.bar) select(stage.bar, 'paint', modes, (m) => show(m, ''));
  else stage.cycle(modes, 1800, ([m, label]) => show(m, label));
  return () => stage.dispose();
};

export default mount;
