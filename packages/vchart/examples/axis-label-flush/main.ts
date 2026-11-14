// Flush: the first and last axis labels shrink inward so they stay inside the axis
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { seeded } from '../../shared/concepts-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const rand = seeded(47);
const data = Array.from({ length: 24 }, () => ({ x: Math.round(rand() * 1000), y: Math.round(rand() * 100) }));
interface State { flush: boolean }

const build = ({ flush }: State): ISpec =>
  ({
    type: 'scatter',
    data: [{ values: data }],
    xField: 'x',
    yField: 'y',
    axes: [
      { orient: 'bottom', type: 'linear', min: 0, max: 1000, label: { flush, style: { fontSize: 14 } }, grid: { visible: true } },
      { orient: 'left', type: 'linear' },
    ],
  }) as unknown as ISpec;

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { flush: true },
    build,
    mode: 'rebuild',
    previewMs: 1500,
    step: (s) => ({ flush: !s.flush }),
    controls: (bar, live) => {
      select(bar, 'label.flush', ['true', 'false'], (v) => live.set({ flush: v === 'true' }));
    },
  });

export default mount;
