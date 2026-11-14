// Pie label guide lines: label.line visible, smooth, line1MinLength and line2MinLength
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { ELEMENTS } from '../../shared/polar-data.ts';

interface State {
  visible: boolean;
  smooth: boolean;
  line1: number;
  line2: number;
}

const STEPS: State[] = [
  { visible: true, smooth: false, line1: 20, line2: 10 },
  { visible: true, smooth: true, line1: 20, line2: 10 },
  { visible: true, smooth: true, line1: 40, line2: 30 },
  { visible: false, smooth: false, line1: 20, line2: 10 },
];

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: STEPS[0] as State,
    build: ({ visible, smooth, line1, line2 }, preview) => ({
      type: 'pie',
      data: [{ id: 'elements', values: ELEMENTS }],
      categoryField: 'type',
      valueField: 'value',
      outerRadius: preview ? 0.55 : 0.7,
      legends: { visible: false },
      label: {
        visible: true,
        position: 'outside',
        line: { visible, smooth, line1MinLength: line1, line2MinLength: line2 },
      },
    }),
    controls: (bar, live) => {
      select(bar, 'line.visible', ['true', 'false'], (v) => live.set({ visible: v === 'true' }));
      select(bar, 'line.smooth', ['false', 'true'], (v) => live.set({ smooth: v === 'true' }));
      slider(bar, 'line1MinLength', [0, 80, 1], 20, (line1) => live.set({ line1 }));
      slider(bar, 'line2MinLength', [0, 80, 1], 10, (line2) => live.set({ line2 }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as State,
    previewMs: 1700,
  });

export default mount;
