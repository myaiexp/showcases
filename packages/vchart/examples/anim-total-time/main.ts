// animationAppear.bar { oneByOne: true, totalTime }: a capped stagger over many bars
import type { Mount } from '@/types.ts';
import { mountReplay } from '../../shared/anim-data.ts';
import { rng } from '../../shared/components-data.ts';
import { slider } from '../../shared/chart.ts';

const r = rng(63);
const rows = Array.from({ length: 40 }, (_, i) => ({ n: String(i + 1), v: Math.round(10 + r() * 60) }));

const mount: Mount = (el, ctx) =>
  mountReplay<{ total: number }>(el, ctx, {
    initial: { total: 2000 },
    period: 5200,
    build: ({ total }, preview) => ({
      type: 'bar',
      data: [{ id: 'bars', values: rows }],
      xField: 'n',
      yField: 'v',
      title: { visible: true, text: `totalTime: ${total} ms`, textStyle: { fontSize: preview ? 12 : 16 } },
      axes: [{ orient: 'bottom', type: 'band', label: { visible: false } }, { orient: 'left', type: 'linear' }],
      animationAppear: { bar: { type: 'growHeightIn', oneByOne: true, duration: 400, totalTime: total } },
    }),
    step: (_s, i) => ({ total: [800, 3000, 1800][i % 3] ?? 2000 }),
    controls: (bar, set) => {
      slider(bar, 'totalTime', [400, 4000, 200], 2000, (total) => set({ total }));
    },
  });

export default mount;
