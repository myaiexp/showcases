// Bar width: a fixed barWidth, or the automatic width clamped by barMinWidth and barMaxWidth
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const values = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => ({ day, sales: [22, 13, 25, 29, 38][i] }));
const MODES: Record<string, Record<string, number | string>> = {
  automatic: {},
  'barWidth: 12': { barWidth: 12 },
  "barWidth: '40%'": { barWidth: '40%' },
  'barMaxWidth: 20': { barMaxWidth: 20 },
  'barMinWidth: 70': { barMinWidth: 70 },
};
const NAMES = Object.keys(MODES);

const mount: Mount = (el, ctx) =>
  mountLive<{ mode: string }>(el, ctx, {
    initial: { mode: 'barWidth: 12' },
    mode: 'rebuild',
    build: ({ mode }) =>
      ({
        type: 'bar',
        data: [{ id: 'sales', values }],
        xField: 'day',
        yField: 'sales',
        label: { visible: true },
        ...MODES[mode],
      }) as ISpec,
    controls: (bar, live) => {
      select(bar, 'width', NAMES, (v) => live.set({ mode: v })).value = 'barWidth: 12';
    },
    step: (_s, i) => ({ mode: NAMES[i % NAMES.length] ?? 'automatic' }),
    previewMs: 1500,
  });

export default mount;
