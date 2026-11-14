// FAQ: tooltip.mark.content / dimension.content key and value callbacks on a radar
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { seeded } from '../../shared/concepts-data.ts';

const KEYS = ['Customer satisfaction', 'Delivery speed', 'Product range', 'Price level', 'After-sales service', 'Brand awareness'];

const mount: Mount = (el, ctx) => {
  const rand = seeded(23);
  const rows = (): { dim: string; value: number; type: string }[] =>
    ['2023', '2024'].flatMap((type) => KEYS.map((dim) => ({ dim, type, value: Math.round(40 + rand() * 55) })));
  const short = (s: string): string => (s.length > 10 ? `${s.slice(0, 9)}…` : s);
  const { vchart, release } = createChart(el, ctx, {
    type: 'radar',
    data: [{ id: 'd', values: rows() }],
    categoryField: 'dim',
    valueField: 'value',
    seriesField: 'type',
    area: { visible: true, style: { fillOpacity: 0.15 } },
    axes: [{ orient: 'angle', label: { formatMethod: (v: string) => short(v) } }, { orient: 'radius', grid: { smooth: false } }],
    tooltip: {
      mark: {
        // One line per hovered point: key and value are formatted separately.
        content: [{ key: (d: { dim: string }) => short(d.dim), value: (d: { value: number }) => `${d.value} pts` }],
      },
      dimension: {
        // One line per series at the hovered angle.
        content: [{ key: (d: { type: string }) => `Year ${d.type}`, value: (d: { value: number }) => `${d.value} pts` }],
      },
    },
    legends: { visible: !ctx.preview, orient: 'bottom' },
  } as unknown as ISpec);
  let alive = true;
  let i = 0;
  const stop = every(1500, () => {
    if (!alive) return;
    i++;
    vchart.setDimensionIndex(KEYS[i % KEYS.length] as string);
    if (i % 6 === 0) void vchart.updateData('d', rows());
  });
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
