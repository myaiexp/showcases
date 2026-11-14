// Marks label their own groups; axes and grids add the scale name
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { ariaReadout } from '../../shared/a11y-readout.ts';
import { mountPlot } from '../../shared/plot.ts';

type S = { grid: boolean; rule: boolean; text: boolean };
const STAGES: S[] = [
  { grid: false, rule: false, text: false },
  { grid: true, rule: false, text: false },
  { grid: true, rule: true, text: false },
  { grid: true, rule: true, text: true },
];

const mount: Mount = async (el, ctx) => {
  const aapl = (await csv('aapl.csv')).slice(-60);
  const readout = ariaReadout(el, ctx.preview);
  const stop = mountPlot<S>(el, ctx, {
    initial: STAGES[0] as S,
    render: ({ grid, rule, text }, { width, height }) =>
      Plot.plot({
        width,
        height,
        grid,
        marks: [
          Plot.lineY(aapl, { x: 'Date', y: 'Close' }),
          Plot.dot(aapl, { x: 'Date', y: 'Close', r: 2 }),
          rule ? Plot.ruleY([160]) : null,
          text ? Plot.text(aapl.slice(-1), { x: 'Date', y: 'Close', text: () => 'latest', dy: -10 }) : null,
        ],
      }),
    step: (_s, i) => STAGES[i % STAGES.length] as S,
    previewMs: 1800,
    after: (root) => readout.update(root),
    controls: (bar, live) => {
      toggle(bar, 'grid', live.state.grid, (grid) => live.set({ grid }));
      toggle(bar, 'ruleY', live.state.rule, (rule) => live.set({ rule }));
      toggle(bar, 'text', live.state.text, (text) => live.set({ text }));
    },
  });
  return () => {
    stop();
    readout.remove();
  };
};

export default mount;
