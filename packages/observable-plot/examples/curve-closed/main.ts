// Closed curves turn a loop of points into a filled shape
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const CURVES = ['linear-closed', 'basis-closed', 'cardinal-closed', 'catmull-rom-closed', 'linear', 'basis', 'cardinal'] as const;
type CurveName = (typeof CURVES)[number];

// A five-pointed star: ten vertices alternating between two radii.
const star = d3.range(10).map((i) => {
  const a = (i * Math.PI) / 5 - Math.PI / 2;
  const r = i % 2 ? 0.45 : 1;
  return { x: r * Math.cos(a), y: r * Math.sin(a) };
});

const mount: Mount = (el, ctx) =>
  mountPlot<{ curve: CurveName }>(el, ctx, {
    initial: { curve: 'cardinal-closed' },
    render: ({ curve }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        marginTop: 24,
        title: preview ? curve : undefined,
        aspectRatio: 1,
        axis: null,
        marks: [Plot.line(star, { x: 'x', y: 'y', curve, fill: 'orange', fillOpacity: 0.4, stroke: 'orange', strokeWidth: 2 }), Plot.dot(star, { x: 'x', y: 'y', r: 2.5 })],
      }),
    step: (_s, i) => ({ curve: CURVES[i % CURVES.length] }),
    previewMs: 1600,
    controls: (bar, live) => {
      select(bar, 'curve', CURVES, live.state.curve, (curve) => live.set({ curve }));
    },
  });

export default mount;
