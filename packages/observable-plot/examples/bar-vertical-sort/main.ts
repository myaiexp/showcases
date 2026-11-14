// Letter frequencies as vertical bars, alphabetical or sorted by descending y
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const alphabet = await csv('alphabet.csv');
  return mountPlot<{ sorted: boolean }>(el, ctx, {
    initial: { sorted: false },
    render: ({ sorted }, { width, height }) =>
      Plot.barY(alphabet, { x: 'letter', y: 'frequency', sort: sorted ? { x: '-y' } : undefined }).plot({ width, height }),
    step: ({ sorted }) => ({ sorted: !sorted }),
    controls: (bar, live) => {
      toggle(bar, "sort: {x: '-y'}", live.state.sorted, (sorted) => live.set({ sorted }));
    },
  });
};

export default mount;
