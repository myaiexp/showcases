// Zebra stripes: grid.alternateColor on the value axis, grid.alignWithLabel on the band axis
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const data = [28, 52, 41, 66, 49, 73].map((v, i) => ({ k: `K${i + 1}`, v }));
const SCHEMES: Record<string, string | string[] | undefined> = {
  none: undefined,
  'one colour': 'rgba(255,255,255,0.06)',
  'two greys': ['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.02)'],
  'three colours': ['rgba(77,171,247,0.18)', 'rgba(255,212,59,0.14)', 'rgba(255,107,107,0.14)'],
};
interface State { scheme: string; align: boolean }

const build = (s: State): ISpec => {
  const alternateColor = SCHEMES[s.scheme];
  return {
    type: 'bar',
    data: [{ values: data }],
    xField: 'k',
    yField: 'v',
    axes: [
      { orient: 'bottom', type: 'band', grid: { visible: true, alignWithLabel: s.align } },
      { orient: 'left', grid: { visible: true, ...(alternateColor ? { alternateColor } : {}) } },
    ],
  } as unknown as ISpec;
};

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { scheme: 'two greys', align: true },
    build,
    mode: 'rebuild',
    previewMs: 1600,
    step: (s) => {
      const names = Object.keys(SCHEMES);
      return { scheme: names[(names.indexOf(s.scheme) + 1) % names.length] ?? 'none' };
    },
    controls: (bar, live) => {
      select(bar, 'alternateColor', Object.keys(SCHEMES), (v) => live.set({ scheme: v })).value = 'two greys';
      select(bar, 'alignWithLabel', ['true', 'false'], (v) => live.set({ align: v === 'true' }));
    },
  });

export default mount;
