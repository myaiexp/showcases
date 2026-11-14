// Channel scale override: stroke as literal color or color scale
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';
import { after } from '../../shared/marks-data.ts';

const MODES = ['scale: null', 'scale: "color"'] as const;
type Mode = (typeof MODES)[number];

// The color column holds valid CSS colors, which Plot would normally read literally.
const data = [
  { name: 'a', color: 'red', x: 1 },
  { name: 'b', color: 'gold', x: 2 },
  { name: 'c', color: 'green', x: 3 },
  { name: 'd', color: 'red', x: 4 },
  { name: 'e', color: 'gold', x: 5 },
];

const mount: Mount = (el, ctx) =>
  mountPlot<{ mode: Mode }>(el, ctx, {
    initial: { mode: MODES[0] },
    render: ({ mode }, { width, height, preview }) =>
      Plot.dot(data, {
        x: 'x',
        y: 'name',
        r: 12,
        strokeWidth: 4,
        // Unscaled: the strings are drawn as colors. On the color scale: they are categories.
        stroke: { value: 'color', scale: mode === MODES[0] ? null : 'color' },
      }).plot({ width, height, inset: 20, color: { legend: !preview && mode === MODES[1] } }),
    step: ({ mode }) => ({ mode: after(MODES, mode) }),
    controls: (bar, live) => {
      select(bar, 'stroke', MODES, MODES[0], (mode) => live.set({ mode }));
    },
  });

export default mount;
