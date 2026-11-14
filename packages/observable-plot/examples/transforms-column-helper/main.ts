// Plot.column: a transform fills a derived channel, with its label kept
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountPlot(el, ctx, {
    initial: { derived: true },
    render: ({ derived }, { width, height }) => {
      if (!derived) return Plot.lineY(aapl, { x: 'Date', y: 'Close' }).plot({ width, height, y: { grid: true } });
      // column() returns [column, setColumn]; the transform calls setColumn once data is known.
      const [Y, setY] = Plot.column('Close');
      const start = aapl[0]!.Close;
      return Plot.lineY(
        aapl,
        Plot.transform({ x: 'Date', y: Y }, (data, facets) => {
          setY(data.map((d: any) => d.Close / start - 1));
          return { data, facets };
        }),
      ).plot({ width, height, y: { grid: true, percent: true, label: '↑ Change since first close' } });
    },
    step: ({ derived }) => ({ derived: !derived }),
    previewMs: 2400,
    controls: (bar, live) => {
      toggle(bar, 'derived channel (change)', live.state.derived, (derived) => live.set({ derived }));
    },
  });
};

export default mount;
