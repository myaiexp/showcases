// Pie supportNegative: negative values counted by their absolute value instead of dropped
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const DATA = [
  { type: 'Revenue', value: 120 },
  { type: 'Refunds', value: -35 },
  { type: 'Costs', value: -60 },
  { type: 'Grants', value: 45 },
];

interface State {
  on: boolean;
}

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { on: true },
    build: ({ on }, preview) => ({
      type: 'pie',
      data: [{ id: 'ledger', values: DATA }],
      categoryField: 'type',
      valueField: 'value',
      supportNegative: on,
      outerRadius: 0.8,
      innerRadius: 0.35,
      legends: { visible: !preview, orient: 'left' },
      label: { visible: true, formatMethod: (_text, datum) => `${datum?.['type']}: ${datum?.['value']}` },
    }),
    controls: (bar, live) => {
      select(bar, 'supportNegative', ['true', 'false'], (v) => live.set({ on: v === 'true' }));
    },
    step: (s) => ({ on: !s.on }),
    previewMs: 1800,
  });

export default mount;
