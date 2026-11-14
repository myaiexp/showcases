// Pie startAngle and endAngle: part-circle pies, with layoutRadius 'auto' to fill the space
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { ELEMENTS } from '../../shared/polar-data.ts';

interface Range {
  start: number;
  end: number;
}

const RANGES: Record<string, Range> = {
  'full circle (-90 to 270)': { start: -90, end: 270 },
  'top half (-180 to 0)': { start: -180, end: 0 },
  'right half (-90 to 90)': { start: -90, end: 90 },
  'three quarters (-225 to 45)': { start: -225, end: 45 },
  'quarter (-90 to 0)': { start: -90, end: 0 },
};
const NAMES = Object.keys(RANGES);

interface State {
  name: string;
}

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { name: NAMES[1] as string },
    build: ({ name }, preview) => {
      const r = RANGES[name] as Range;
      return {
        type: 'pie',
        data: [{ id: 'elements', values: ELEMENTS }],
        categoryField: 'type',
        valueField: 'value',
        startAngle: r.start,
        endAngle: r.end,
        // 'auto' sizes the radius from the angle range, so a half pie is not drawn tiny.
        layoutRadius: 'auto',
        innerRadius: 0.5,
        outerRadius: 0.9,
        legends: { visible: !preview, orient: 'left' },
        label: { visible: false },
      };
    },
    controls: (bar, live) => {
      select(bar, 'angle range', NAMES, (name) => live.set({ name }));
    },
    step: (_s, i) => ({ name: NAMES[i % NAMES.length] as string }),
    previewMs: 1800,
  });

export default mount;
