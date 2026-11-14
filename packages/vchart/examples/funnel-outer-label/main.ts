// Funnel outerLabel: names outside the funnel on guide lines, with the values kept inside the layers
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { funnelRows } from '../../shared/funnel-data.ts';

interface State {
  position: 'left' | 'right';
  align: boolean;
  minLength: number;
}

const STEPS: State[] = [
  { position: 'left', align: true, minLength: 20 },
  { position: 'right', align: true, minLength: 20 },
  { position: 'right', align: false, minLength: 40 },
  { position: 'left', align: false, minLength: 10 },
];

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: STEPS[0] as State,
    build: ({ position, align, minLength }, preview) => ({
      type: 'funnel',
      data: [{ id: 'stages', values: funnelRows() }],
      categoryField: 'name',
      valueField: 'value',
      maxSize: '60%',
      legends: { visible: false },
      label: { visible: true, formatMethod: (_t, datum) => String(datum?.['value']), style: { fontSize: preview ? 9 : 12 } },
      outerLabel: {
        visible: true,
        position,
        alignLabel: align,
        formatMethod: (_t, datum) => String(datum?.['name']),
        line: { visible: true, minLength },
        style: { fontSize: preview ? 9 : 12 },
      },
    }),
    controls: (bar, live) => {
      select(bar, 'outerLabel.position', ['left', 'right'], (v) => live.set({ position: v as State['position'] }));
      select(bar, 'alignLabel', ['true', 'false'], (v) => live.set({ align: v === 'true' }));
      slider(bar, 'line.minLength', [0, 80, 1], live.state.minLength, (minLength) => live.set({ minLength }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as State,
    previewMs: 1700,
  });

export default mount;
