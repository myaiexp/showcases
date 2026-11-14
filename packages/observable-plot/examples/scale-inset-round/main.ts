// Position inset, insetLeft and insetTop, and round
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider, toggle } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const corners = [[0, 0], [10, 0], [0, 10], [10, 10], [5, 5], [5, 0], [0, 5], [10, 5], [5, 10]].map(([x, y]) => ({ x, y }));

const mount: Mount = (el, ctx) =>
  mountPlot(el, ctx, {
    initial: { inset: 0, asymmetric: false, round: false },
    render: ({ inset, asymmetric, round }, { width, height }) =>
      Plot.plot({
        width,
        height,
        round,
        x: { domain: [0, 10], inset, ...(asymmetric ? { insetLeft: 30 } : {}) },
        y: { domain: [0, 10], inset, ...(asymmetric ? { insetTop: 30 } : {}) },
        marks: [Plot.frame({ strokeOpacity: 0.2 }), Plot.dot(corners, { x: 'x', y: 'y' })],
      }),
    step: (_s, i) => ({ inset: [0, 5, 15, 5][i % 4], asymmetric: i % 4 === 3 }),
    previewMs: 1800,
    controls: (bar, live) => {
      slider(bar, 'inset ', [0, 40, 1], live.state.inset, (inset) => live.set({ inset }));
      toggle(bar, 'insetLeft/insetTop 30 ', live.state.asymmetric, (asymmetric) => live.set({ asymmetric }));
      toggle(bar, 'round ', live.state.round, (round) => live.set({ round }));
    },
  });

export default mount;
