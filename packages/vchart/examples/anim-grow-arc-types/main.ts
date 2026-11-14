// animationAppear.pie type: growRadiusIn and growAngleIn
import type { Mount } from '@/types.ts';
import { mountReplay } from '../../shared/anim-data.ts';
import { select } from '../../shared/chart.ts';

const TYPES = ['growAngleIn', 'growRadiusIn'] as const;
const rows = [
  { kind: 'Rent', value: 38 },
  { kind: 'Food', value: 24 },
  { kind: 'Travel', value: 15 },
  { kind: 'Savings', value: 13 },
  { kind: 'Other', value: 10 },
];

const mount: Mount = (el, ctx) =>
  mountReplay<{ type: (typeof TYPES)[number] }>(el, ctx, {
    initial: { type: 'growAngleIn' },
    period: 3000,
    build: ({ type }, preview) => ({
      type: 'pie',
      data: [{ id: 'budget', values: rows }],
      categoryField: 'kind',
      valueField: 'value',
      outerRadius: 0.85,
      innerRadius: 0.35,
      legends: { visible: false },
      label: { visible: false },
      title: { visible: true, text: type, textStyle: { fontSize: preview ? 12 : 16 } },
      animationAppear: { pie: { type, duration: 1400, easing: 'cubicOut', oneByOne: type === 'growRadiusIn' ? 120 : false } },
    }),
    step: (_s, i) => ({ type: TYPES[i % 2] ?? 'growAngleIn' }),
    controls: (bar, set) => {
      select(bar, 'type', TYPES, (v) => set({ type: v as (typeof TYPES)[number] }));
    },
  });

export default mount;
