// Axis label layout: autoHide, autoRotate and autoLimit (sampling off)
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select, slider } from '../../shared/chart.ts';
import { seeded } from '../../shared/concepts-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const rand = seeded(43);
const NAMES = ['Electronics and appliances', 'Garden and outdoor living', 'Books, music and film', 'Health and beauty', 'Toys and games', 'Automotive parts', 'Office supplies', 'Pet food and care', 'Sports equipment', 'Home furnishings', 'Groceries', 'Jewellery'];
const data = NAMES.map((name) => ({ name, sales: Math.round(20 + rand() * 80) }));
interface State { autoHide: boolean; autoRotate: boolean; autoLimit: boolean; maxHeight: number }
const SCENES: Partial<State>[] = [
  { autoHide: false, autoRotate: false, autoLimit: false },
  { autoHide: true, autoRotate: false, autoLimit: false },
  { autoHide: false, autoRotate: true, autoLimit: false },
  { autoHide: false, autoRotate: true, autoLimit: true },
];

const build = (s: State): ISpec =>
  ({
    type: 'bar',
    data: [{ values: data }],
    xField: 'name',
    yField: 'sales',
    axes: [
      {
        orient: 'bottom',
        sampling: false,
        maxHeight: s.maxHeight,
        label: { autoHide: s.autoHide, autoRotate: s.autoRotate, autoLimit: s.autoLimit, limitEllipsis: '...', autoRotateAngle: [0, 45, 90] },
      },
      { orient: 'left' },
    ],
  }) as unknown as ISpec;

const bool = (v: string): boolean => v === 'true';
const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { autoHide: false, autoRotate: true, autoLimit: true, maxHeight: 90 },
    build,
    mode: 'rebuild',
    step: (_s, i) => ({ maxHeight: 90, ...SCENES[i % SCENES.length] }),
    controls: (bar, live) => {
      select(bar, 'autoHide', ['false', 'true'], (v) => live.set({ autoHide: bool(v) }));
      select(bar, 'autoRotate', ['true', 'false'], (v) => live.set({ autoRotate: bool(v) }));
      select(bar, 'autoLimit', ['true', 'false'], (v) => live.set({ autoLimit: bool(v) }));
      slider(bar, 'axis maxHeight', [30, 200, 5], 90, (v) => live.set({ maxHeight: v }));
    },
  });

export default mount;
