// The getting-started histogram: 10,000 normal samples binned by binX
import * as Plot from '@observablehq/plot';
import * as d3 from 'd3';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = (el, ctx) =>
  mountPlot(el, ctx, {
    initial: { draw: 0 },
    // d3.randomNormal() is an accessor called once per element of {length: 10000}, so
    // every render draws a fresh sample; the card redraws one every few seconds.
    render: (_state, { width, height }) =>
      Plot.rectY({ length: 10000 }, Plot.binX({ y: 'count' }, { x: d3.randomNormal() })).plot({ width, height }),
    step: (s) => ({ draw: s.draw + 1 }),
    controls: (bar, live) => {
      button(bar, 'New sample', () => live.set({ draw: live.state.draw + 1 }));
    },
  });

export default mount;
