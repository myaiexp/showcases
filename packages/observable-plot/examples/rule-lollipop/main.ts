// Rule: a lollipop chart, a skinny bar with a dot marker; ruleX or ruleY
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const alphabet = await csv('alphabet.csv');
  return mountPlot<{ horizontal: boolean }>(el, ctx, {
    initial: { horizontal: false },
    render: ({ horizontal }, { width, height }) =>
      horizontal
        ? Plot.plot({
            width,
            height,
            y: { label: null, tickPadding: 6, tickSize: 0 },
            x: { percent: true },
            marks: [Plot.ruleY(alphabet, { y: 'letter', x: 'frequency', strokeWidth: 2, markerEnd: 'dot' })],
          })
        : Plot.plot({
            width,
            height,
            x: { label: null, tickPadding: 6, tickSize: 0 },
            y: { percent: true },
            marks: [Plot.ruleX(alphabet, { x: 'letter', y: 'frequency', strokeWidth: 2, markerEnd: 'dot' })],
          }),
    step: ({ horizontal }) => ({ horizontal: !horizontal }),
    controls: (bar, live) => {
      toggle(bar, 'horizontal (ruleY, like barX)', live.state.horizontal, (horizontal) => live.set({ horizontal }));
    },
  });
};

export default mount;
