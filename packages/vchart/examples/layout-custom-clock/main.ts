// A custom layout function: N pie regions placed on a circle like clock hours
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { mountReplay } from '../../shared/anim-data.ts';
import { rng } from '../../shared/components-data.ts';
import { slider } from '../../shared/chart.ts';

function clockSpec(n: number): ISpec {
  const r = rng(n * 31);
  const region = Array.from({ length: n }, (_, i) => ({ id: `clock${i}` }));
  const series = region.map((reg, i) => ({
    regionId: reg.id,
    type: 'pie',
    valueField: 'value',
    categoryField: 'type',
    seriesField: 'type',
    label: { visible: false },
    data: { id: `data${i}`, values: [0, 1, 2, 3].map((d) => ({ value: 10 + r() * 90, type: `type${d}` })) },
  }));
  return { type: 'common', padding: 0, region, series, legends: { visible: false }, tooltip: { visible: false } } as ISpec;
}

const mount: Mount = (el, ctx) =>
  mountReplay<{ n: number }>(el, ctx, {
    initial: { n: 12 },
    period: 2400,
    build: ({ n }) => clockSpec(n),
    step: (_s, i) => ({ n: [12, 8, 5, 10][i % 4] ?? 12 }),
    // The layout function runs on the VChart constructor options, not in the spec.
    init: {
      layout: (_chart, all, rect) => {
        // Only the regions are placed: they are the layout items with layoutType 'region'.
        const items = all.filter((item) => item.layoutType === 'region');
        const n = items.length;
        const radius = Math.min(rect.width / 2, rect.height / 2);
        const center = { x: rect.width / 2, y: rect.height / 2 };
        const size = Math.min(radius * 0.4, (Math.PI * 2 * radius * 0.8) / n);
        const ring = radius - size * 0.5;
        items.forEach((item, index) => {
          const angle = (index / n) * Math.PI * 2;
          item.setLayoutStartPosition({
            x: center.x + Math.sin(angle) * ring - size * 0.5,
            y: center.y - Math.cos(angle) * ring - size * 0.5,
          });
          item.setLayoutRect({ width: size, height: size });
          // Always call this after a position and size are set.
          (item as { updateLayoutAttribute?: () => void }).updateLayoutAttribute?.();
        });
      },
    },
    controls: (bar, set) => {
      slider(bar, 'regions', [3, 12, 1], 12, (n) => set({ n }));
    },
  });

export default mount;
