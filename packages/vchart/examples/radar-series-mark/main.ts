// Radar marks: area, line and point layers, and seriesMark choosing the one the legend shows
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { monthRows } from '../../shared/polar-data.ts';

const ROWS = monthRows(['Team A', 'Team B'], ['Q1 plan', 'Q2 plan', 'Q3 plan', 'Q4 plan', 'Review', 'Launch'], 41);

type Mark = 'area' | 'line' | 'point';
const MARKS: Mark[] = ['area', 'line', 'point'];

interface State {
  mark: Mark;
  area: boolean;
  point: boolean;
}

const STEPS: State[] = [
  { mark: 'area', area: true, point: false },
  { mark: 'line', area: false, point: false },
  { mark: 'point', area: false, point: true },
  { mark: 'area', area: true, point: true },
];

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: STEPS[0] as State,
    build: ({ mark, area, point }, preview) => ({
      type: 'radar',
      data: [{ id: 'plans', values: ROWS }],
      categoryField: 'month',
      valueField: 'value',
      seriesField: 'type',
      seriesMark: mark,
      area: { visible: area },
      line: { visible: true, style: { lineWidth: 2 } },
      point: { visible: point, style: { size: 9 } },
      legends: { visible: true, orient: 'top' },
      axes: [{ orient: 'radius', label: { visible: !preview } }, { orient: 'angle' }],
    }),
    controls: (bar, live) => {
      select(bar, 'seriesMark', MARKS, (v) => live.set({ mark: v as Mark }));
      select(bar, 'area.visible', ['true', 'false'], (v) => live.set({ area: v === 'true' }));
      select(bar, 'point.visible', ['false', 'true'], (v) => live.set({ point: v === 'true' }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as State,
    previewMs: 1800,
  });

export default mount;
