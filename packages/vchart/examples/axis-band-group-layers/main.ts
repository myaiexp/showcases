// Grouped band axis: showAllGroupLayers draws a label row per xField level, layers hides rows
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const data = ['Q1', 'Q2', 'Q3'].flatMap((quarter, i) =>
  ['North', 'South'].map((team, j) => ({ quarter, team, n: 20 + ((i * 17 + j * 29) % 45) })),
);
interface State { showAll: boolean; inner: boolean; outer: boolean }
const SCENES: State[] = [
  { showAll: false, inner: true, outer: true },
  { showAll: true, inner: true, outer: true },
  { showAll: true, inner: true, outer: false },
  { showAll: true, inner: false, outer: true },
];

const build = (s: State): ISpec =>
  ({
    type: 'bar',
    data: [{ values: data }],
    xField: ['quarter', 'team'],
    yField: 'n',
    seriesField: 'team',
    axes: [
      { orient: 'bottom', type: 'band', showAllGroupLayers: s.showAll, layers: [{ visible: s.inner }, { visible: s.outer }] },
      { orient: 'left' },
    ],
  }) as unknown as ISpec;

const bool = (v: string): boolean => v === 'true';
const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: SCENES[1] as State,
    build,
    mode: 'rebuild',
    step: (_s, i) => SCENES[i % SCENES.length] ?? {},
    controls: (bar, live) => {
      select(bar, 'showAllGroupLayers', ['true', 'false'], (v) => live.set({ showAll: bool(v) })).value = 'true';
      select(bar, 'layers[0] (inner) visible', ['true', 'false'], (v) => live.set({ inner: bool(v) }));
      select(bar, 'layers[1] (outer) visible', ['true', 'false'], (v) => live.set({ outer: bool(v) }));
    },
  });

export default mount;
