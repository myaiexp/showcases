// Pie padAngle and cornerRadius: gaps between sectors and rounded sector corners
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { ELEMENTS } from '../../shared/polar-data.ts';

interface State {
  pad: number;
  corner: number;
}

const STEPS: State[] = [
  { pad: 0, corner: 0 },
  { pad: 2, corner: 0 },
  { pad: 2, corner: 12 },
  { pad: 6, corner: 20 },
];

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: STEPS[2] as State,
    build: ({ pad, corner }, preview) => ({
      type: 'pie',
      data: [{ id: 'elements', values: ELEMENTS }],
      categoryField: 'type',
      valueField: 'value',
      innerRadius: 0.5,
      outerRadius: 0.85,
      padAngle: pad,
      cornerRadius: corner,
      legends: { visible: !preview, orient: 'left' },
      label: { visible: false },
    }),
    controls: (bar, live) => {
      slider(bar, 'padAngle', [0, 10, 0.5], live.state.pad, (pad) => live.set({ pad }));
      slider(bar, 'cornerRadius', [0, 30, 1], live.state.corner, (corner) => live.set({ corner }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as State,
    previewMs: 1500,
  });

export default mount;
