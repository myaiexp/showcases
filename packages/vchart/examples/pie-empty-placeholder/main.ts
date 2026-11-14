// Pie with empty data: emptyPlaceholder.showEmptyCircle and showAllZero
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

type Case = 'data' | 'empty' | 'all zero';
const CASES: Case[] = ['data', 'empty', 'all zero'];
const NAMES = ['Search', 'Direct', 'Social', 'Email'];

const rows = (c: Case): { type: string; value: number }[] =>
  c === 'empty' ? [] : NAMES.map((type, i) => ({ type, value: c === 'all zero' ? 0 : [40, 28, 20, 12][i] as number }));

interface State {
  data: Case;
  circle: boolean;
  allZero: boolean;
}

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { data: 'empty', circle: true, allZero: true },
    build: ({ data, circle, allZero }, preview) => ({
      type: 'pie',
      data: [{ id: 'traffic', values: rows(data) }],
      categoryField: 'type',
      valueField: 'value',
      innerRadius: 0.5,
      outerRadius: 0.8,
      legends: { visible: false },
      label: { visible: !preview },
      showAllZero: allZero,
      emptyPlaceholder: { showEmptyCircle: circle, emptyCircle: { style: { innerRadius: 0.5, fill: '#66ccff' } } },
    }),
    controls: (bar, live) => {
      select(bar, 'data', CASES, (v) => live.set({ data: v as Case })).value = live.state.data;
      select(bar, 'showEmptyCircle', ['true', 'false'], (v) => live.set({ circle: v === 'true' }));
      select(bar, 'showAllZero', ['true', 'false'], (v) => live.set({ allZero: v === 'true' }));
    },
    step: (_s, i) => ({ data: CASES[i % 3] as Case }),
    previewMs: 1600,
  });

export default mount;
