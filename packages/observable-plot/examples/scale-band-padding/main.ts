// A band scale: paddingInner separates bands, paddingOuter insets
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

interface State {
  inner: number;
  outer: number;
}
const steps: State[] = [
  { inner: 0.1, outer: 0.1 },
  { inner: 0.6, outer: 0 },
  { inner: 0, outer: 0.5 },
  { inner: 0.4, outer: 0.4 },
];

const mount: Mount = async (el, ctx) => {
  const alphabet = (await csv('alphabet.csv')).slice(0, 12);
  return mountPlot<State>(el, ctx, {
    initial: steps[0] as State,
    render: ({ inner, outer }, { width, height }) =>
      Plot.plot({
        width,
        height,
        x: { paddingInner: inner, paddingOuter: outer },
        y: { grid: true },
        marks: [Plot.barY(alphabet, { x: 'letter', y: 'frequency' }), Plot.ruleY([0])],
      }),
    step: (_s, i) => steps[i % steps.length] as State,
    previewMs: 1800,
    controls: (bar, live) => {
      slider(bar, 'paddingInner ', [0, 1, 0.01], live.state.inner, (inner) => live.set({ inner }));
      slider(bar, 'paddingOuter ', [0, 1, 0.01], live.state.outer, (outer) => live.set({ outer }));
    },
  });
};

export default mount;
