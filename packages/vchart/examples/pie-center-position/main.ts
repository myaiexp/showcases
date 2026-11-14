// Pie centerX and centerY: percentage strings place the pie inside the chart area
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { ELEMENTS } from '../../shared/polar-data.ts';

interface State {
  x: number;
  y: number;
}

const STEPS: State[] = [
  { x: 50, y: 50 },
  { x: 25, y: 50 },
  { x: 25, y: 30 },
  { x: 75, y: 70 },
];

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: STEPS[0] as State,
    build: ({ x, y }, preview) => ({
      type: 'pie',
      data: [{ id: 'elements', values: ELEMENTS }],
      categoryField: 'type',
      valueField: 'value',
      centerX: `${x}%`,
      centerY: `${y}%`,
      outerRadius: 0.5,
      innerRadius: 0.2,
      legends: { visible: false },
      label: { visible: !preview },
    }),
    controls: (bar, live) => {
      slider(bar, 'centerX %', [10, 90, 1], live.state.x, (x) => live.set({ x }));
      slider(bar, 'centerY %', [10, 90, 1], live.state.y, (y) => live.set({ y }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as State,
    previewMs: 1500,
  });

export default mount;
