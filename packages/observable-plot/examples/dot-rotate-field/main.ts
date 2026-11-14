// Dot rotate channel: triangles on a grid turn to follow a swirling field
import * as d3 from 'd3';
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const points = d3.cross(d3.range(0, 20), d3.range(0, 12), (x, y) => ({ x, y }));

const mount: Mount = (el, ctx) =>
  mountPlot<{ phase: number }>(el, ctx, {
    initial: { phase: 0 },
    render: ({ phase }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        axis: null,
        inset: 12,
        color: { scheme: 'sinebow', type: 'linear', domain: [0, 360] },
        marks: [
          Plot.dot(points, {
            x: 'x',
            y: 'y',
            symbol: 'triangle',
            r: preview ? 4.5 : 7,
            // rotate is degrees clockwise; a channel gives each triangle its own angle.
            rotate: (d: { x: number; y: number }) => (Math.atan2(d.y - 5.5, d.x - 9.5) * 180) / Math.PI + phase,
            fill: (d: { x: number; y: number }) => (((Math.atan2(d.y - 5.5, d.x - 9.5) * 180) / Math.PI + phase) % 360 + 360) % 360,
          }),
        ],
      }),
    step: ({ phase }) => ({ phase: (phase + 45) % 360 }),
    previewMs: 900,
    controls: (bar, live) => slider(bar, 'phase (degrees)', [0, 360, 5], live.state.phase, (phase) => live.set({ phase })),
  });

export default mount;
